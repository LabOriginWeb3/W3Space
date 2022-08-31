import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    conns: [],
    liveVideos: [],
    nearByMsg: JSON.parse(localStorage.getItem("nearByMsg")) || [],
    talkMsg: JSON.parse(localStorage.getItem("talkMsg")) || [],
    openScreen: localStorage.getItem("openScreen") || false,
    role: (localStorage.getItem("role") == 'true' || !localStorage.getItem("role"))?{id:1,nftname:'',nftid:0,name:''} : JSON.parse(localStorage.getItem("role")),
    roleInfo: localStorage.getItem("roleInfo") || {},
    openLiveScreen: localStorage.getItem("openLiveScreen") || false,
    officeSpaceAddress: localStorage.getItem("officeSpaceAddress") || "",
    meetingName: localStorage.getItem("meetingName") || "",
    officeSpaceType: localStorage.getItem("officeSpaceType") || 1,
    helpStatus: JSON.parse(localStorage.getItem("helpStep")) || { helpStep: 0 },
    teamMsg: JSON.parse(localStorage.getItem("teamMsg")) || [],
    teamId: localStorage.getItem("teamId") || 0,
  },
  mutations: {
    setConns(state, newConns) {
      console.log("setConns", newConns);
      let arr = [];
      if (newConns.length != 0) {
        for (let j = 0; j < newConns[newConns.length - 1].sindex + 1; j++) {
          arr.push(0);
        }
        for (let i = 0; i < newConns.length; i++) {
          arr[newConns[i].sindex] = newConns[i];
        }
      }

      state.conns = [];
      state.conns = arr;
    },
    setLiveVideos(state, newVideos) {
      state.liveVideos = [];
      state.liveVideos = newVideos;
    },
    addNearByMsg(state, msg) {
      // console.log("msg is", msg);
      let t = [];
      if (localStorage.getItem("nearByMsg") != null) {
        t = JSON.parse(localStorage.getItem("nearByMsg"));
      }

      if (t.length >= 100) {
        t = t.slice(1, 100);
        localStorage.setItem("nearByMsg", JSON.stringify(t));
      }

      if (msg.fileSize && msg.fileSize > 0) {
        let id = msg.sender
        for (let i = 0; i < t.length; i++) {
          if (t[i].sender == id && t[i].fileSize) {
            t.splice(i, 1)
          }
        }
      }

      t.push(msg);
      localStorage.setItem("nearByMsg", JSON.stringify(t));
      t = JSON.parse(localStorage.getItem("nearByMsg"));
      state.nearByMsg = t;
      // console.log("nearByMsg", t);
    },
    addTalkMsg(state, msg) {
      // console.log("talk msg is", msg);
      let t = [];
      if (localStorage.getItem("talkMsg") != null) {
        t = JSON.parse(localStorage.getItem("talkMsg"));
      }

      t.push(msg);
      localStorage.setItem("talkMsg", JSON.stringify(t));
      t = JSON.parse(localStorage.getItem("talkMsg"));
      state.talkMsg = t;
      // console.log("talkMsg", t);
    },

    addTeamMsg(state, msg) {
      // console.log("team msg is", msg);
      let t = [];
      if (localStorage.getItem("teamMsg") != null) {
        t = JSON.parse(localStorage.getItem("teamMsg"));
      }

      t.push(msg);
      localStorage.setItem("teamMsg", JSON.stringify(t));
      t = JSON.parse(localStorage.getItem("teamMsg"));
      state.teamMsg = t;
      // console.log("teamMsg", t);
    },

    addReadStatus(state, item) {
      // console.log("item is", item);
      let t = [];
      if (item === 'Everyone') {
        if (localStorage.getItem("talkMsg") != null) {
          t = JSON.parse(localStorage.getItem("talkMsg"));
          t.forEach((v) => {
            if (v.target === 1) {
              v.read = true
            }
          })
          localStorage.setItem("talkMsg", JSON.stringify(t));
          state.talkMsg = t;
        }
      } else if (item === 'Nearby') {
        if (localStorage.getItem("nearByMsg") != null) {
          t = JSON.parse(localStorage.getItem("nearByMsg"));
          t.forEach((v) => {
            v.read = true
          })
          localStorage.setItem("nearByMsg", JSON.stringify(t));
          state.nearByMsg = t;
        }
      } else {
        if (localStorage.getItem("talkMsg") != null) {
          t = JSON.parse(localStorage.getItem("talkMsg"));
          t.forEach((v) => {
            if (v.sender === item.id) {
              v.read = true
            }
          })
          localStorage.setItem("talkMsg", JSON.stringify(t));
          state.talkMsg = t;
        }
      }
    },
    addReadTeamStatus(state, item) {
      console.log("item is", item);
      let t = [];
      if (localStorage.getItem("teamMsg") != null) {
        t = JSON.parse(localStorage.getItem("teamMsg"));
        t.forEach((v) => {
          if (v.target === state.teamId) {
            v.read = true
          }
        })
        localStorage.setItem("teamMsg", JSON.stringify(t));
        state.teamMsg = t;
      }
    },
    setTeamId(state, status) {
      localStorage.setItem("teamId", status);
      state.teamId = status;
    },
    setOpenScreen(state, status) {
      localStorage.setItem("openScreen", status);
      state.openScreen = status;
    },
    setOpenLiveScreen(state, status) {
      localStorage.setItem("openLiveScreen", status);
      state.openLiveScreen = status;
    },
    setRole(state, status) {
      localStorage.setItem("role", JSON.stringify(status));
      state.role = status;
    },
    setRoleInfo(state, msg) {
      let t = {};
      localStorage.setItem("roleInfo", JSON.stringify(msg));
      t = JSON.parse(localStorage.getItem("roleInfo"));
      state.roleInfo = t;
    },
    setOfficeSpaceAddress(state, status) {
      localStorage.setItem("officeSpaceAddress", status);
      state.officeSpaceAddress = status;
    },
    setMeetingName(state, status) {
      localStorage.setItem("meetingName", status);
      state.meetingName = status;
    },
    setOfficeSpaceType(state, status) {
      localStorage.setItem("officeSpaceType", status);
      state.officeSpaceType = status;
    },
    setHelpStep(state, step) {
      state.helpStatus.helpStep = step;
      localStorage.setItem("helpStep", JSON.stringify(state.helpStatus));
    },
    setHelpDone(state, name) {
      state.helpStatus[name] = true;
      localStorage.setItem("helpStep", JSON.stringify(state.helpStatus));
    },
    clearHelp(state) {
      state.helpStatus = { helpStep: 0, move: true };
      localStorage.setItem("helpStep", JSON.stringify(state.helpStatus));
    },
  },
  actions: {},
  modules: {}
});

