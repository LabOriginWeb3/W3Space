import store from "../store";
import AgoraRTC from "agora-rtc-sdk-ng";
import BeautyExtension from "agora-extension-beauty-effect";
// import VirtualBackgroundExtension from "agora-extension-virtual-background";
function LiveRTC() {
  AgoraRTC.setLogLevel(2)
  this.client = null;
  this.screenClient = null

  const extension = new BeautyExtension();
  AgoraRTC.registerExtensions([extension]);

  this.processor = extension.createProcessor();
  this.processor.setOptions({
    lighteningContrastLevel: 2,
    lighteningLevel: 0.9,
    smoothnessLevel: 0.9,
    sharpnessLevel: 0.5,
    rednessLevel: 0.5
  });
  this.offerOptions = {};
  this.localTracks = {
    videoTrack: null,
    audioTrack: null
  };
  this.screenTrack = null;
  this.remoteUsers = [];
  this.options = {
    appid: 'bf3632c73b364e87a71980b75a4c6334',
    audienceLatency: 2
  };
  this.joinedRoom = {}
}

LiveRTC.prototype.joinAsAudience = async function (channel, token, id) {
  try {
    this.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    this.client.setClientRole("audience", {
      // Set latency level to low latency
      level: 1,
    });
    this.client.on("user-published", (user, mediaType) => {
      this.handleUserPublished(user, mediaType)
    });
    this.client.on("user-unpublished", (user, mediaType) => {
      this.handleUserUnpublished(user, mediaType)
    });
    if (this.joinedRoom[channel] == true) {
      await this.client.leave();
    }
    this.options.uid = await this.client.join(
        this.options.appid,
        channel,
        token || null,
        id || null
    );
    this.listenVolumn()
    this.joinedRoom[channel] = true
    console.log('join as Audience successful')
  } catch (error) {
    console.log('error', error)
  }

}
LiveRTC.prototype.joinAsHost = async function (channel, token, id) {
  this.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
  this.client.setClientRole("host");
  // console.log('joinAsHost', channel, token, id)

  this.options.uid = await this.client.join(
      this.options.appid,
      channel,
      token || null,
      id || null
  );
  this.listenVolumn()

  this.client.on("user-published", (user, mediaType) => {
    this.handleUserPublished(user, mediaType)
  });
  this.client.on("user-unpublished", (user, mediaType) => {
    this.handleUserUnpublished(user, mediaType)
  });

  this.joinedRoom[channel] = true

  this.localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

  await this.client.publish(this.localTracks.audioTrack);
  console.log("publish success");
}
LiveRTC.prototype.joinAsCall = async function (channel, token, id) {
  this.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  this.options.uid = await this.client.join(
      this.options.appid,
      channel,
      token || null,
      id || null
  );
  this.listenVolumn()

  this.client.on("user-published", (user, mediaType) => {
    this.handleUserPublished(user, mediaType)
  });
  this.client.on("user-unpublished", (user, mediaType) => {
    this.handleUserUnpublished(user, mediaType)
  });

  this.joinedRoom[channel] = true

  this.localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

  await this.client.publish(this.localTracks.audioTrack);
  console.log("publish success");
}

LiveRTC.prototype.getVolumeLevel = function () {
  let a = 0
  if (this.localTracks.audioTrack)
    a = this.localTracks.audioTrack.getVolumeLevel();
  return a
}
LiveRTC.prototype.openVideo = async function () {
  if (!this.localTracks.videoTrack)
    this.localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
  await this.localTracks.videoTrack.setEnabled(true);
  this.localTracks.videoTrack.pipe(this.processor).pipe(this.localTracks.videoTrack.processorDestination);
  await this.processor.enable();
  this.localTracks.videoTrack.play("selfVideo");
  await this.client.publish(this.localTracks.videoTrack);
}

LiveRTC.prototype.closeVideo = async function () {
  await this.localTracks.videoTrack.setEnabled(false);
}
LiveRTC.prototype.listenVolumn = async function () {
  this.client.enableAudioVolumeIndicator();
  this.client.on("volume-indicator", volumes => {
    volumes.forEach((volume) => {
      // console.log(`UID ${volume.uid} Level ${volume.level}`);
      for (let i = 0; i < this.remoteUsers.length; i++) {
        if (this.remoteUsers[i].uid == volume.uid) {
          this.remoteUsers[i].speakingLevel = volume.level;
          if (volume.level >= 15 && i !== 0) {
            let newList = this.remoteUsers;
            newList.unshift(newList[i]);
            newList.splice(i + 1, 1);
            this.remoteUsers = newList;
            // console.log(this.remoteUsers)
            // store.commit("setLiveVideos", this.remoteUsers);
          }
        }
      }
    });
  })
}

LiveRTC.prototype.closeAudio = async function () {
  await this.localTracks.audioTrack.setEnabled(false);
}

LiveRTC.prototype.openAudio = async function () {
  await this.localTracks.audioTrack.setEnabled(true);
}

LiveRTC.prototype.startScreenShare = async function (channel, token, id, isHost) {
  if (this.screenClient) {
    await this.screenClient.leave()
  }
  this.screenClient = isHost ? AgoraRTC.createClient({ mode: "live", codec: "vp8" }) : AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  if (isHost)
    this.screenClient.setClientRole("host");
  try {
    await this.screenClient.join(this.options.appid, channel, token, id);

    this.screenTrack = await AgoraRTC.createScreenVideoTrack({optimizationMode: "motion"});
    await this.screenClient.publish(this.screenTrack);
    console.log("Screen share success");
    this.screenTrack.on('track-ended', async (e) => {
      console.log(e)
      this.closeScreen()
    })
    return true
  } catch (error) {
    this.screenClient.leave()
    console.log("publish failed");
    return false
  }
}


LiveRTC.prototype.closeScreen = async function () {
  try {
    if (this.screenTrack) {
      this.screenTrack.stop();
      this.screenTrack.close();
      this.screenTrack = null;
    }
    await this.screenClient.leave();
    store.commit('setOpenLiveScreen', false)
    console.log("close screen channel success");

  } catch (error) {
    console.log(error);
  }
}
LiveRTC.prototype.leave = async function (channel) {
  try {
    for (let trackName in this.localTracks) {
      var track = this.localTracks[trackName];
      if (track) {
        track.stop();
        track.close();
        this.localTracks[trackName] = undefined;
      }
    }

    // remove remote users and player views
    this.remoteUsers = [];
    store.commit("setLiveVideos", this.remoteUsers);

    // leave the channel
    await this.client.leave();
    if (this.screenTrack) {
      this.screenTrack.stop();
      this.screenTrack.close();
      this.screenTrack = null;
    }
    if (this.screenClient) {
      await this.screenClient.leave()
    }
    this.joinedRoom[channel] = false

    console.log("client leaves channel success");

  } catch (error) {
    console.log(error);
  }
}

LiveRTC.prototype.handleUserPublished = async function (user, mediaType) {

  await this.client.subscribe(user, mediaType);
  let hasUser = false;
  let index = 0
  console.log("handleUserPublished", user);
  for (let i = 0; i < this.remoteUsers.length; i++) {
    if (this.remoteUsers[i].uid == user.uid) {
      this.remoteUsers[i] = user
      index = i
      hasUser = true
    }
  }
  if (!hasUser) {
    this.remoteUsers.push(user)
    index = this.remoteUsers.length - 1
  }
  console.log("subscribe success", user, mediaType);
  if (mediaType === 'audio') {
    this.remoteUsers[index].hasAudioTrack = true
  }
  if (mediaType === 'video') {
    this.remoteUsers[index].hasVideoTrack = true
  }

  store.commit("setLiveVideos", this.remoteUsers);
  setTimeout(() => {
    if (mediaType === 'audio') {
      user.audioTrack.play();
    }
    if (mediaType === 'video') {
      user.videoTrack.play("liveVideo" + user.uid);
    }
  }, 200)

}

LiveRTC.prototype.handleUserUnpublished = function (user, mediaType) {
  if (mediaType === 'video') {
    let id = user.uid;
    for (let i = 0; i < this.remoteUsers.length; i++) {
      if (this.remoteUsers[i].uid == id) {
        this.remoteUsers[i].hasVideoTrack = false
        // if(this.remoteUsers[i].hasAudioTrack !== true)
        //   this.remoteUsers.splice(i, 1)
      }
    }
  }
  if (mediaType === 'audio') {
    let id = user.uid;
    for (let i = 0; i < this.remoteUsers.length; i++) {
      if (this.remoteUsers[i].uid == id) {
        this.remoteUsers[i].hasAudioTrack = false
        // if(this.remoteUsers[i].hasVideoTrack !== true)
        //   this.remoteUsers.splice(i, 1)
      }
    }
  }
  store.commit("setLiveVideos", this.remoteUsers);
}


export { LiveRTC };
