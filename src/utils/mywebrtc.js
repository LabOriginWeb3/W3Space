import store from "../store";
import BandwidthHandler from "./BandwidthHandler";
import {SoundMeter} from "./soundmeter";
function MyWebRTC() {
  this.serverConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      {
        urls: "turn:turn.w3work.org:9090",
        username: "admin",
        credential: "admin"
      }
    ]
  };
  this.offerOptions = {};
  if (navigator.userAgent.indexOf('Firefox') >= 0) {
    this.videoOption = {
      width: { min: 0, max: 720 }
    }
    console.log('this is Firefox')
  } else {
    this.videoOption = {
      width: { min: 0, ideal: 320 },
      height: { min: 0, ideal: 240 },
      frameRate: { ideal: 10, max: 15 }
    }
  }

  this.bandwidth = {
    screen: 300, // 300kbits minimum
    audio: 50,   // 50kbits  minimum
    video: 128   // 128kbits (both min-max)
  };

  this.conns = []; // all RTCConnection
  this.localStream = null; // localStream

  this.mediaStream = null; // localScreen
  this.games = null;
  this.openAudio = false;
  this.openVideo = false;
  this.screenStatus = localStorage.getItem("screenStatus") == "true" ? true : false;
  this.windowOrder = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.receiveBuffer = {},
      this.receivedSize = {},
      this.fileSize = {},
      window.meterRefresh = null

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new AudioContext();
  } catch (e) {
    alert('Web Audio API not supported.');
  }
}

MyWebRTC.prototype.isSupport = function () {
  navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
  return navigator.getUserMedia != null;
};

// Initialization to directly create a local connection
MyWebRTC.prototype.init = async function (games) {
  this.games = games;
  this.games.webrtc = this;
  try {
    navigator.mediaDevices.addEventListener('devicechange', () => {
      if (this.openAudio) {
        this.reloadAudio()
      }
    });

  } catch (error) {
    console.log(error)
    return false
  }

};

MyWebRTC.prototype.openMedia = async function (e) {
  try {
    if (this.localStream)
      this.localStream.getTracks().forEach((track) => track.stop())
    let stream = await navigator.mediaDevices
        .getUserMedia({ video: this.openVideo ? this.videoOption : false, audio: this.openAudio })

    this.localStream = stream
    let video = document.querySelector("#localVideo");
    video.srcObject = stream;
    video.playsInline = true;
    video.play();

    if (e == 0) {
      // this.localStream.getTracks()[0].addEventListener('ended', () => {
      //   console.log('audio stop')
      //   this.reloadAudio()
      // })
      this.conns.forEach((peer) => {
        if (peer.getSenders()[0].track) {
          peer.getSenders()[0].replaceTrack(this.localStream.getTracks()[0])
          if (this.openVideo) {
            peer.getSenders()[1].replaceTrack(this.localStream.getTracks()[1])
          }
        } else {
          this.refreshOffer(peer.targetID)
        }
      });
      this.handleSuccess(stream)
    } else {
      // open video track
      let track = this.openAudio ? this.localStream.getTracks()[1] : this.localStream.getTracks()[0]
      this.conns.forEach((peer) => {
        if (peer.getSenders()[1].track && (peer.getSenders()[2].track || !peer.hasScreenTrack)) {
          peer.getSenders()[1].replaceTrack(track)
          if (this.openAudio) {
            peer.getSenders()[0].replaceTrack(this.localStream.getTracks()[0])
          }
        } else {
          this.refreshOffer(peer.targetID)
        }
      });
    }


  } catch (error) {
    console.log("cannot open webrtc", error);
  }
}

MyWebRTC.prototype.handleSuccess = async function(stream) {
  const that = this
  const soundMeter = new SoundMeter(window.audioContext);
  soundMeter.connectToSource(stream, function(e) {
    console.log(e)
    let showSpeaking = false
    if(!window.meterRefresh)
      window.meterRefresh = setInterval(() => {
        let sound = soundMeter.slow.toFixed(2)
        // console.log(sound);// while > 0.02,speaking
        if(sound > 0.02 && showSpeaking == false) {
          // console.log(2)
          that.sendToGdevelop("showSpeaking", {
            status: 2
          })
          showSpeaking = true
        }

        if(sound <= 0.02 && showSpeaking == true) {
          // console.log(3)
          that.sendToGdevelop("showSpeaking", {
            status: 3
          })
          showSpeaking = false
        }
      }, 500);
  });
}

MyWebRTC.prototype.reloadAudio = async function () {
  try {
    if (this.localStream)
      this.localStream.getTracks().forEach((track) => track.stop())
    let stream = await navigator.mediaDevices
        .getUserMedia({ video: this.openVideo ? this.videoOption : false, audio: this.openAudio })

    this.localStream = stream
    let video = document.querySelector("#localVideo");
    video.srcObject = stream;
    video.playsInline = true;
    video.play();

    if (this.openAudio) {
      this.conns.forEach((peer) => {
        if (peer.getSenders()[0].track) {
          peer.getSenders()[0].replaceTrack(this.localStream.getTracks()[0])
          if (this.openVideo) {
            peer.getSenders()[1].replaceTrack(this.localStream.getTracks()[1])
          }
        } else {
          this.refreshOffer(peer.targetID)
        }
      });
      this.handleSuccess(stream)
    }

  } catch (error) {
    console.log("cannot open webrtc", error);
  }
}
MyWebRTC.prototype.closeMedia = function (e) {
  let t = e == 0 ? "audio" : "video"
  let sender = this.localStream.getTracks().find(function (s) {
    return s.kind == t;
  });
  if (sender) {
    sender.stop()
    // console.log('closeMedia', e, t, this.localStream.getTracks())
  }
  if(e == 0) {
    clearInterval(window.meterRefresh)
    window.meterRefresh = null
    // console.log(4)
    this.sendToGdevelop("showSpeaking", {
      status: 4
    })
  }
  if (!this.openAudio && !this.openVideo) this.localStream = null
}

MyWebRTC.prototype.shareScreenStream = function () {
  navigator.mediaDevices
      .getDisplayMedia({
        video: {
          cursor: "always",
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 10, max: 15 }
        },
        audio: false
      })
      .then(async (mediaStream) => {
        var video = document.querySelector("#localScreenSelf");
        video.srcObject = mediaStream;
        video.playsInline = true;
        video.play();
        this.mediaStream = mediaStream;
        this.screenStatus = true
        store.commit("setOpenScreen", true);

        // console.log('this.mediaStream.getTracks()', this.mediaStream.getTracks())



        this.conns.forEach((peer) => {
          if (peer.getSenders()[2].track) {
            peer.getSenders()[2].replaceTrack(this.mediaStream.getTracks()[0])
          } else if (peer.getSenders()[1].track && !peer.hasVideoTrack) {
            peer.getSenders()[1].replaceTrack(this.mediaStream.getTracks()[0])
          } else {
            this.refreshOffer(peer.targetID)
          }
        });

        let arr1 = [];
        for (let j = 0; j < this.conns.length; j++) {
          arr1.push(this.conns[j].targetID);
        }
        this.sendToGdevelop("screenStatus", {
          targetID: arr1,
          status: true,
        });



        const that = this;

        mediaStream.getTracks()[0].onended = function () {
          that.mediaStream = null;
          that.screenStatus = false;
          store.commit("setOpenScreen", false);

          let arr = [];
          for (let i = 0; i < that.conns.length; i++) {
            arr.push(that.conns[i].targetID);
          }
          that.sendToGdevelop("screenStatus", {
            targetID: arr,
            status: false,
          });
        };
      })
      .catch((err) => {
        console.log("cannot init getDisplayMedia", err);
      });
};

MyWebRTC.prototype.checkPeerStatus = function (arr) {
  // console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].canconn == false) {
      this.closePeer(arr[i].id)
    }
  }
}

// Is it in the link list
MyWebRTC.prototype.isInConnAry = function (targetID) {
  return this.getConnByID(targetID) != null;
};


MyWebRTC.prototype.getConnsOrder = function (targetID) {
  for (var i = 0; i < this.conns.length; i++) {
    if (this.conns[i].targetID == targetID) {
      return i;
    }
  }
  return this.conns.length;
};

MyWebRTC.prototype.getConnByID = function (targetID) {
  for (var i = 0; i < this.conns.length; i++) {
    if (this.conns[i].targetID == targetID) {
      return this.conns[i];
    }
  }
  return null;
};

MyWebRTC.prototype.setTargetIdAudioStatus = function (targetID, status) {
  for (var i = 0; i < this.conns.length; i++) {
    if (this.conns[i].targetID == targetID) {
      this.conns[i].audioStatus = status;
      store.commit("setConns", this.conns);
    }
  }
};


MyWebRTC.prototype.setTargetIdVideoStatus = function (targetID, status) {
  for (var i = 0; i < this.conns.length; i++) {
    if (this.conns[i].targetID == targetID) {
      this.conns[i].videoStatus = status;
      if (status == false && this.conns[i].videoAmount > 0) {
        this.conns[i].videoAmount -= 1;
      }
      store.commit("setConns", this.conns);
    }
  }
};
MyWebRTC.prototype.setTargetIdScreenStatus = function (targetID, status) {
  for (var i = 0; i < this.conns.length; i++) {
    if (this.conns[i].targetID == targetID) {
      this.conns[i].screenStatus = status;
      if (status == false && this.conns[i].videoAmount > 0) {
        this.conns[i].videoAmount -= 1;
      }
      store.commit("setConns", this.conns);
    }
  }
};

MyWebRTC.prototype.refreshOffer = async function (targetID) {
  let i = 0;

  for (var index = 0; index < this.conns.length; index++) {
    if (this.conns[index].targetID == targetID) {
      i = index
    }
  }


  await this.conns[i].close();
  // console.log('now conns is', i, this.conns)
  var peer = await this.createPeer(targetID);

  //test createDataChannel
  var channel = peer.createDataChannel("chatmessage");
  this.receiveBuffer[targetID] = []
  this.receivedSize[targetID] = 0
  channel.onmessage = (event) => {
    if(typeof(event.data) == 'string') {
      store.commit("addNearByMsg", JSON.parse(event.data));
      let res = JSON.parse(event.data)
      if(res.fileSize && res.fileSize > 0)
        this.fileSize[targetID] = {fileSize: res.fileSize, name: res.fileName, type: res.fileType}
    } else {
      this.onReceiveMessageCallback(event.data, targetID)
    }
  };
  peer.send = channel;

  // createOffer
  peer.createOffer(this.offerOptions).then(async (sdp) => {
    sdp = { type: sdp.type, sdp: BandwidthHandler.setApplicationSpecificBandwidth(sdp.sdp, this.bandwidth, this.screenStatus) };
    await peer.setLocalDescription(sdp);
    // console.log('now this.conns[i] is', i, this.conns[i])

    peer.sindex = this.conns[i].sindex;
    this.conns[i] = peer

    await this.sendToGdevelop("sdp", {
      targetID: targetID,
      sdp: sdp,
      audioStatus: this.openAudio,
      videoStatus: this.openVideo,
      screenStatus: this.screenStatus
    });
  });
}

MyWebRTC.prototype.createOffer = async function (targetID) {
  let opeer = this.getConnByID(targetID);
  // console.log('opeer.connectionState', opeer)
  if (
      opeer != null && opeer.connectionState == "connected"
  ) {
    console.log(
        "peer already exist"
    );
    return;
  }
  if (
      opeer != null && (opeer.connectionState == "new" || opeer.connectionState == 'connecting')
  ) {
    console.log(
        "peer is connecting", opeer
    );
    return;
  }

  if (
      opeer != null &&
      (opeer.connectionState == 'disconnected' || opeer.connectionState == 'failed' || opeer.connectionState == 'closed')
  ) {
    for (var i = 0; i < this.conns.length; i++) {
      if (this.conns[i].targetID == targetID) {
        this.windowOrder[this.conns[i].sindex] = 0;
        this.conns.splice(i, 1);
      }
    }
    console.log("peer connectionState failed,create again");
  }
  var peer = await this.createPeer(targetID);

  //test createDataChannel
  var channel = peer.createDataChannel("chatmessage");
  this.receiveBuffer[targetID] = []
  this.receivedSize[targetID] = 0
  channel.onmessage = (event) => {
    // let res = JSON.parse(event.data)
    // console.log('res', res)
    if(typeof(event.data) == 'string') {
      store.commit("addNearByMsg", JSON.parse(event.data));
      let res = JSON.parse(event.data)
      if(res.fileSize && res.fileSize > 0)
        this.fileSize[targetID] = {fileSize: res.fileSize, name: res.fileName, type: res.fileType}
    } else {
      this.onReceiveMessageCallback(event.data, targetID)
    }
  };
  peer.send = channel;

  peer.createOffer(this.offerOptions).then(async (sdp) => {
    sdp = { type: sdp.type, sdp: BandwidthHandler.setApplicationSpecificBandwidth(sdp.sdp, this.bandwidth, this.screenStatus) };
    await peer.setLocalDescription(sdp);
    let i = this.windowOrder.indexOf(0);
    if (this.windowOrder.indexOf(targetID) > -1) {
      console.log(
          "createOffer error, targetID already in windowOrder",
          targetID
      );
      return;
    }

    peer.sindex = i;
    this.conns.splice(i, 0, peer);
    this.windowOrder[i] = targetID;

    await this.sendToGdevelop("sdp", {
      targetID: targetID,
      sdp: sdp,
      audioStatus: this.openAudio,
      videoStatus: this.openVideo,
      screenStatus: this.screenStatus
    });
  });
};

MyWebRTC.prototype.sleep = function (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
};
MyWebRTC.prototype.onReceiveMessageCallback = function (data, id) {
  this.receiveBuffer[id].push(data);
  this.receivedSize[id] += data.byteLength;
  // console.log(`Received Message ${data.byteLength}, this.receivedSize[id],${this.receivedSize[id]} this.fileSize[id].fileSize, ${this.fileSize[id].fileSize}`);

  if (this.receivedSize[id] === this.fileSize[id].fileSize) {
    const received = new Blob(this.receiveBuffer[id]);
    this.receiveBuffer[id] = [];
    this.receivedSize[id] = 0

    let a = document.querySelector('#download' + id)
    a.href = URL.createObjectURL(received);
    a.download = this.fileSize[id].name;
    a.textContent =
        `Click to download '${this.fileSize[id].name}' (${this.fileSize[id].fileSize} bytes)`;
    a.style.display = 'block'
  }
};

MyWebRTC.prototype.createPeer = async function (targetID) {
  var peer = new RTCPeerConnection(this.serverConfig);
  peer.targetID = targetID;
  peer.videoAmount = 0

  if (!this.openAudio) {
    peer.addTransceiver("audio", {
      direction: "recvonly"
    });
  }


  if (this.localStream != null) {
    this.localStream.getTracks().forEach((track) => {
      if (track.readyState == 'live')
        peer.addTrack(track, this.localStream);
    });
  }

  if (this.mediaStream !== null) {
    peer.addTrack(this.mediaStream.getTracks()[0], this.mediaStream);
  }


  if (!this.openVideo) {
    peer.addTransceiver("video", {
      direction: "recvonly"
    });
  }
  if (this.mediaStream == null) {
    peer.addTransceiver("video", {
      direction: "recvonly"
    });
  }

  // console.log('peer is', peer.getSenders(), peer.getReceivers())


  // Listen for local ICE candidate information and add it to the remote end
  peer.onicecandidate = async (event) => {
    if (event.candidate) {
      await this.sendToGdevelop("icecandidate", {
        targetID: targetID,
        icecandidate: event.candidate
      });
    }
  };

  peer.addEventListener(
      "track",
      async (e) => {
        // console.log("get trackInfo", e);
        let id = this.getConnsOrder(targetID);
        if (e.track.kind == 'video') {
          if (peer.screenStatus == false && peer.videoStatus == false) return
          peer.videoAmount += 1
          if (peer.videoAmount == 2 && (peer.screenStatus == false || peer.videoStatus == false)) {
            return
          }

          if (peer.videoAmount > 1 || peer.videoStatus == false) {
            // console.log('this is a screen')
            var domName = "#remoteScreen" + (id + 1);
            var screen = document.querySelector(domName);
            screen.srcObject = e.streams[0];
            screen.playsInline = true;
            // screen.style.display = "block";
          } else {
            // console.log('this is a video')
            var name = "#remoteVideo" + (id + 1);
            var video = document.querySelector(name);
            video.srcObject = e.streams[0];
            video.playsInline = true;
            video.style.display = "block";
          }
        } else {
          var name2 = "#remoteVideo" + (id + 1);
          var audio = document.querySelector(name2);
          audio.srcObject = e.streams[0];
          audio.playsInline = true;
          audio.style.display = "block";
        }
      },
      false
  );

  peer.addEventListener('connectionstatechange', event => {
    console.log('connectionstatechange', event)
    if (peer.connectionState === 'connected') {
      // Peers connected!
      this.sendToGdevelop("connectok", peer.targetID);
      // console.log("connectok", peer.targetID)
    }
    // if (peer.connectionState == 'disconnected' || peer.connectionState == 'failed') {
    // Peers disconnected!
    //   this.closePeer(peer.targetID);
    // }
  });
  return peer;
};

MyWebRTC.prototype.triggerTrack = function (trackId, status) {
  if (trackId == 0) {
    this.openAudio = status;
    localStorage.setItem("openAudio", status);
  } else {
    this.openVideo = status;
    localStorage.setItem("openVideo", status);
  }
};

MyWebRTC.prototype.trackStatus = function (trackId) {
  return this.localStream.getTracks()[trackId].enabled;
};

// Description The remote initiator is received
MyWebRTC.prototype.onRecvOffer = async function (
    id,
    sdp,
    audioStatus,
    videoStatus,
    screenStatus,
    name
) {
  // console.log("onRecvOffer", id, audioStatus, videoStatus, screenStatus, 'now conns is', this.conns);


  var peer = await this.createPeer(id);
  // console.log("local tracks", peer.getSenders());

  peer.audioStatus = audioStatus;
  peer.videoStatus = videoStatus;
  peer.screenStatus = screenStatus;
  peer.name = name;
  if (this.openVideo) {
    peer.hasVideoTrack = true
  }
  if (this.screenStatus) {
    peer.hasScreenTrack = true
  }

  peer.ondatachannel = (event)=> {
    var channel = event.channel;
    channel.onmessage = (event) => {

      if(typeof(event.data) == 'string') {
        store.commit("addNearByMsg", JSON.parse(event.data));
        let res = JSON.parse(event.data)
        if(res.fileSize && res.fileSize > 0)
          this.fileSize[id] = {fileSize: res.fileSize, name: res.fileName, type: res.fileType}
      } else {
        this.onReceiveMessageCallback(event.data, id)
      }
    };
    peer.send = channel;
  };

  this.receiveBuffer[id] = []
  this.receivedSize[id] = 0

  // Check whether a connection exists
  if (this.isInConnAry(id) == true) {
    console.log("onRecvOffer error, targetID already in conn ary", id, this.conns);
    // return;

    for (var j = 0; j < this.conns.length; j++) {
      if (this.conns[j].targetID == id) {
        peer.sindex = this.conns[j].sindex
        this.conns[j] = peer
      }
    }
  } else {
    let i = this.windowOrder.indexOf(0);
    peer.sindex = i;
    this.conns.splice(i, 0, peer);
    this.windowOrder[i] = id;
  }
  store.commit("setConns", this.conns);
  peer
      .setRemoteDescription(sdp)
      .then(() => {
        peer
            .createAnswer(this.offerOptions)
            .then((mysdp) => {
              mysdp = { type: mysdp.type, sdp: BandwidthHandler.setApplicationSpecificBandwidth(mysdp.sdp, this.bandwidth, this.screenStatus) };
              peer.setLocalDescription(mysdp);
              this.sendToGdevelop("answer", {
                targetID: id,
                sdp: mysdp,
                audioStatus: this.openAudio,
                videoStatus: this.openVideo,
                screenStatus: this.screenStatus
              });
            })
            .catch((err) => {
              console.log("createAnswer error", err);
            });
      })
      .catch((err) => {
        console.log("setRemoteDescription error", err);
      });
  if (navigator.userAgent.indexOf('Firefox') >= 0) {
    this.sendToGdevelop("connectok", peer.targetID);
  }
};

// The remote response is received.
MyWebRTC.prototype.onRecvAnswer = async function (
    id,
    sdp,
    audioStatus,
    videoStatus,
    screenStatus,
    name
) {
  var peer = this.getConnByID(id);
  if (peer == null) {
    console.log("onRecvAnswer error, targetID is not exist", id);
    return;
  } else {
    peer.audioStatus = audioStatus;
    peer.videoStatus = videoStatus;
    peer.screenStatus = screenStatus;
    peer.name = name;
    if (this.openVideo) {
      peer.hasVideoTrack = true
    }
    if (this.screenStatus) {
      peer.hasScreenTrack = true
    }
  }

  store.commit("setConns", this.conns);

  peer.setRemoteDescription(sdp).catch((e) => {
    console.log("onRecvAnswer setRemoteDescription error", e, sdp);
    this.createOffer(id);
  });
  if (navigator.userAgent.indexOf('Firefox') >= 0) {
    this.sendToGdevelop("connectok", peer.targetID);
  }
};

MyWebRTC.prototype.onRecvICECandidate = function (id, icecandidate) {
  // console.log("onRecvICECandidate", id, icecandidate);
  var peer = this.getConnByID(id);
  if (peer == null) {
    console.log("onRecvICECandidate error, targetID is not exist", id);
    return;
  }
  peer
      .addIceCandidate(icecandidate)
      .catch((e) => console.log("addIceCandidate error", e));
};

MyWebRTC.prototype.closePeer = async function (id) {
  var peer = this.getConnByID(id);
  if (peer == null) {
    console.log("closePeer error, targetID is not exist", id);
    return;
  }

  // peer.getSenders().forEach((sender)=> {
  //   sender.stop()
  // })
  await peer.close();
  for (var i = 0; i < this.conns.length; i++) {
    if (this.conns[i].targetID == id) {
      this.windowOrder[this.conns[i].sindex] = 0;
      this.conns.splice(i, 1);
      await store.commit("setConns", this.conns);
      // console.log("closePeer", this.conns, this.windowOrder);
      break;
    }
  }
};

MyWebRTC.prototype.sendToGdevelop = async function (cmd, param) {
  console.log("sendToGdevelop", cmd, param);
  await this.games.setH5Data(cmd, param);
};

export { MyWebRTC };
