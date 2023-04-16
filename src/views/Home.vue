<template>
  <div class="home" @click="changeMap()">
    <Map
        v-show="getShowMap()"
        @setshowMap="
        showMap = false;
        showExploreMap = false;
      "
        :webRtc="webRtc"
    ></Map>
    <div class="homeLogo" v-show="mapId !== 202 && mapId !== 105">
      <!-- <img src="../assets/home.png" @click="goW3Link()" /> -->
      <lottie-player
          @click="goW3Link()"
          src="https://lottie.host/4b3a726f-5c96-48fb-9aa0-2e6c02c9ad0e/0Lp0LadiBq.json"
          background="transparent"
          speed="1"
          style="width: 52px; height: 52px"
          autoplay
      ></lottie-player>
      <p class="version">V0.8.42</p>
    </div>

    <div class="wallet" v-show="ifLodingComplete">
      <div class="connectBotton" v-if="getConnectType()" @click="connect">
        connect Wallet
      </div>
      <div v-else>
        {{ account ? account.slice(0, 6) + ".." + account.slice(-4) : "" }}
        <div
            class="connectBotton"
            style="margin-top: 5px"
            @click="disconnectMetaMask"
        >
          disconnect
        </div>
      </div>
    </div>

    <!-- <div
      class="apply"
      v-show="ifLodingComplete"
      @click="
        showCreateroom = true;
        getOffice2();
        closeMenu();
      "
    >
      <img src="../assets/build2.png" class="buildIcon" />
    </div> -->
    <div v-if="mapId === 202" class="mettingInvite" @click="showInvite = true">
      <img src="../assets/mettingInvite.png" />
    </div>
    <!-- v-if="mapId !== 202 && mapId !== 105" -->
    <div class="flex_Toplist">
      <div
          id="remote-windows"
          class="remote-windows"
          ref="remoteScroll"
          :class="{
          'remote-windows-show': showVideo,
          'remote-top': activeVideo === 'self',
        }"
      >
        <div
            :class="{
            'remote-window': true,
            remoteWindow: true,
          }"
            v-for="i in listNum"
            :key="i"
            v-show="vueConns[i - 1] != 0"
        >
          <!-- <div class="light_wave"><img src="../assets/light_wave.png"></div> -->
          <div class="flex_align">
            <div
                class="video-outers"
                :class="{
                'remote-window-active': activeVideo === 'v' + i,
              }"
                style="margin-bottom: 0px !important"
            >
              <div class="video-content">
                <div
                    class="remoteVideoLoading"
                    :class="'remoteVideoLoading' + vueConns[i - 1].targetID"
                >
                  <img src="../assets/loading.gif" />
                </div>
                <video
                    :id="'remoteVideo' + i"
                    class="video-window video-center"
                    style="display: none"
                    autoplay
                    @click="openVideoWrapper('v' + i)"
                ></video>

                <div
                    v-show="vueConns[i - 1].videoStatus == false"
                    :class="{
                    'my-avatar': true,
                    test: getHeadImg(vueConns[i - 1], vueConns[i - 1].targetID),
                  }"
                    @click="openVideoWrapper('v' + i)"
                >
                  <img :src="getNearByImg(vueConns[i - 1].targetID)" />
                  <span
                      :class="{
                      status: true,
                      online: vueConns[i - 1].status === 0,
                      away: vueConns[i - 1].status === 1,
                      busy: vueConns[i - 1].status === 2,
                      offline: vueConns[i - 1].status === 3,
                    }"
                  ></span>
                </div>
              </div>
              <div class="laber">
                <p>
                  {{
                    vueConns[i - 1] == 0 || !vueConns[i - 1].name
                        ? ""
                        : vueConns[i - 1].name
                  }}
                </p>
              </div>
              <div class="video-controls" @click="openVideoWrapper('v' + i)">
                <div class="video-audio-video" @click="cancelBubble($event)">
                  <img
                      class="audioBtn closeBtn"
                      v-show="vueConns[i - 1].audioStatus == false"
                      src="../assets/sound-close.png"
                  />
                  <img
                      class="audioBtn"
                      v-show="vueConns[i - 1].audioStatus != false"
                      src="../assets/sound.png"
                  />

                  <!-- v-show="vueConns[i - 1].videoStatus == false"  v-show="vueConns[i - 1].videoStatus != false"-->
                  <img
                      style="display: none"
                      class="videoBtn closeBtn"
                      src="../assets/video-close.png"
                  />
                  <img
                      style="display: none"
                      class="videoBtn"
                      src="../assets/video.png"
                  />

                  <img
                      class="msgBtn"
                      src="../assets/message.png"
                      @click="goSendMsg(vueConns[i - 1])"
                      v-show="mapId !== 105"
                  />
                </div>
              </div>
            </div>
            <div
                v-show="vueConns[i - 1].screenStatus == true"
                class="screen-window"
                :class="{
                'remote-window-active': activeVideo === 's' + i,
              }"
            >
              <div class="laber">
                <p>
                  {{
                    vueConns[i - 1] == 0 || !vueConns[i - 1].name
                        ? ""
                        : vueConns[i - 1].name + "'s screen"
                  }}
                </p>
              </div>
              <div
                  class="remoteScreenLoading"
                  :class="'remoteScreenLoading' + vueConns[i - 1].targetID"
              >
                <img src="../assets/loading.gif" />
              </div>
              <video
                  class="video-window"
                  style="background-color: #000"
                  :id="'remoteScreen' + i"
                  autoplay
                  @click="openVideoWrapper('s' + i)"
              ></video>
            </div>
          </div>
        </div>
        <!--
          remoteWindowNone: true,
          remoteWindowShow: getLiveVideoNone(item.uid),
      -->
        <div
            :class="{
            'remote-window': true,
            remoteWindow: true,
            remoteWindowNone: getLiveUid(item.uid) || item.hidden,
          }"
            v-for="(item, index) in liveVideos"
            :key="index"
        >
          <div
              v-show="activeVideo !== 'l' + item.uid"
              :class="{
              light_wave: true,
              light_wave2: miniScreen,
              waveNone: item.hasAudioTrack == true && item.speakingLevel > 15,
            }"
          >
            <img src="../assets/light_wave.png" />
          </div>
          <div
              :class="{
              'remote-window-active': activeVideo === 'l' + item.uid,
              'remote-window-active-Screen': !getShowControls(item.uid),
              'openOrstow-Screen': openOrstow,
            }"
          >
            <div
                :class="{
                'video-outers': getShowControls(item.uid),
                'video-screen': !getShowControls(item.uid),
              }"
            >
              <div class="video-content">
                <div
                    class="remoteVideoLoading"
                    :class="'remoteVideoLoading' + item.uid"
                >
                  <img src="../assets/loading.gif" />
                </div>
                <div
                    class="video-window"
                    :id="'liveVideo' + item.uid"
                    @click="openVideoWrapper('l' + item.uid)"
                >
                  <div
                      v-if="showYvette"
                      style="
                      width: 100%;
                      height: 100%;
                      position: relative;
                      overflow: hidden;
                      background-color: black;
                    "
                  >
                    <video
                        class="agora_video_player"
                        playsinline=""
                        autoplay
                        loop
                        height="100%"
                        style="
                        position: absolute;
                        left: 12px;
                        top: 0px;
                        object-fit: cover;
                      "
                    >
                      <source
                          src="https://alpha.w3work.org/Tour.mp4"
                          type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>
              <div class="laber">
                <p>{{ findUserName(item.uid) }}</p>
                <img
                    :class="{
                    openOrstow: true,
                    openS: openOrstow === false,
                    stowS: openOrstow === true,
                  }"
                    @click="ClickopenOrstow()"
                    src="../assets/openS.svg"
                />
              </div>
              <div
                  v-show="item.hasVideoTrack !== true"
                  :class="{
                  'my-avatar': true,
                  test: getHeadImg(item, (item.uid % 100000) + 1010000000),
                  'my-avatar-screen': !getShowControls(item.uid),
                }"
                  @click="openVideoWrapper('l' + item.uid)"
              >
                <!-- <img :src="getNearByImg((item.uid % 100000) + 1010000000)" /> -->
                <img
                    v-if="mapId == 202 || mapId == 105"
                    :src="getLiveImg((item.uid % 100000) + 1010000000)"
                />
                <img
                    v-else
                    :src="getNearByImg((item.uid % 100000) + 1010000000)"
                />
                <span
                    :class="{
                    status: true,
                    online: item.status === 0 || !status,
                    away: item.status === 1,
                    busy: item.status === 2,
                    offline: item.status === 3,
                  }"
                ></span>
              </div>
              <div
                  class="video-controls"
                  v-show="getShowControls(item.uid)"
                  @click="openVideoWrapper('l' + item.uid)"
              >
                <div class="video-audio-video" @click="cancelBubble($event)">
                  <img
                      class="audioBtn closeBtn"
                      v-show="item.hasAudioTrack !== true"
                      src="../assets/sound-close.png"
                  />
                  <img
                      class="audioBtn"
                      v-show="
                      item.hasAudioTrack == true &&
                      (item.speakingLevel <= 15 || !item.speakingLevel)
                    "
                      src="../assets/sound.png"
                  />
                  <img
                      class="audioBtn"
                      v-show="
                      item.hasAudioTrack == true && item.speakingLevel > 15
                    "
                      src="../assets/speaking.png"
                  />
                  <img
                      class="videoBtn closeBtn"
                      v-show="item.hasVideoTrack !== true"
                      src="../assets/video-close.png"
                  />
                  <img
                      class="videoBtn"
                      v-show="item.hasVideoTrack == true"
                      src="../assets/video.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
          @click="setGamefocus"
          @mousemove="mouseUserOver"
          v-show="
          (ifLodingComplete &&
            mapId !== 103 &&
            mapId !== 202 &&
            mapId !== 105) ||
          ((mapId === 103 || mapId === 202 || mapId === 105) &&
            liveHouse &&
            (nearBylist[0].sponsorLive === 1 || nearBylist[0].sponsor === 1)) ||
          (mapId === 201 && liveHouse) ||
          (mapId === 104 && liveHouse) ||
          (mapId === 203 && liveHouse) ||
          (mapId === 202 && amaMode == 1) ||
          (mapId === 105 && amaMode == 1)
        "
          :class="{
          localArea: true,
          'localArea-show': showVideo,
        }"
          :style="openOrstow === true ? 'z-index:1' : 'z-index:2'"
      >
        <div
            :class="{
            'localArea-active': activeVideo === 'self',
          }"
        >
          <div class="video-outers">
            <div class="video-content">
              <div class="selfVideoLoading">
                <img src="../assets/loading.gif" />
              </div>
              <video
                  id="localVideo"
                  muted
                  class="video-window video-center"
                  ref="localVideo"
              ></video>
              <div
                  v-if="liveHouse"
                  id="selfVideo"
                  :style="openLiveVideo === false ? 'height:0' : ''"
                  @click="openVideoWrapper('self')"
              ></div>
            </div>

            <div class="laber">
              <p @click="mouseUserOver">
                {{ nearBylist[0] ? nearBylist[0].nickname : "" }}
              </p>
              <div
                  v-show="showUserInfo"
                  class="user-status"
                  @mouseleave="mouseUserLeave"
              >
                <div class="tip-top">
                  <div class="user-info">
                    <div>
                      <img
                          v-if="nearBylist[0]"
                          :src="getRoleImg(nearBylist[0])"
                      />
                      <span
                          :class="{
                          online: workStatus === 0,
                          away: workStatus === 1,
                          busy: workStatus === 2,
                          offline: workStatus === 3,
                        }"
                      ></span>
                    </div>
                    <div>
                      <p>
                        {{ nearBylist[0] ? nearBylist[0].nickname : "" }}
                      </p>
                      <span>{{
                          workStatus === 0
                              ? "online"
                              : workStatus === 1
                              ? "away"
                              : workStatus === 2
                                  ? "busy"
                                  : "offline"
                        }}</span>
                    </div>
                  </div>
                  <div class="change-status">
                    <div class="status">
                      <p>STATUS</p>
                      <p class="settingIcon">
                        <img
                            src="../assets/setting.svg"
                            @click="changeSetting()"
                        />
                      </p>
                    </div>
                    <div @click="changeStatus(0)">
                      <div class="online"></div>
                      online
                    </div>
                    <div @click="changeStatus(1)">
                      <div class="away"></div>
                      away
                    </div>
                    <div @click="changeStatus(2)">
                      <div class="busy"></div>
                      busy
                    </div>
                    <div @click="changeStatus(3)">
                      <div class="offline"></div>
                      offline
                    </div>
                  </div>
                  <div class="other" style="display: none">
                    <div>My Account</div>
                    <div>Log Out</div>
                  </div>
                </div>
              </div>
            </div>
            <div
                v-if="openVideo == false"
                class="my-avatar selfAvatar"
                @click="openVideoWrapper('self')"
            >
              <img v-if="nearBylist[0]" :src="getRoleImg(nearBylist[0])" />
              <span
                  :class="{
                  status: true,
                  online: workStatus === 0,
                  away: workStatus === 1,
                  busy: workStatus === 2,
                  offline: workStatus === 3,
                }"
              ></span>
            </div>
            <div class="video-controls" @click="openVideoWrapper('self')">
              <div class="video-Wrapper" @click="cancelBubble($event)">
                <div v-if="liveHouse" class="video-audio-video">
                  <img
                      class="audioBtn closeBtn"
                      @click="setLiveAudioOpen"
                      v-if="openLiveAudio == false"
                      src="../assets/sound-close.png"
                  />
                  <img
                      class="audioBtn"
                      @click="setLiveAudioClose"
                      v-if="openLiveAudio == true"
                      src="../assets/sound.png"
                  />
                  <img
                      class="videoBtn closeBtn"
                      @click="openLiveVideos"
                      v-if="openLiveVideo == false"
                      src="../assets/video-close.png"
                  />
                  <img
                      class="videoBtn"
                      v-if="openLiveVideo == true"
                      @click="closeLiveVideos"
                      src="../assets/video.png"
                  />
                </div>
                <div v-else class="video-audio-video">
                  <img
                      class="audioBtn closeBtn"
                      v-if="openAudio == false"
                      src="../assets/sound-close.png"
                      @click="triggerTrack(0, true)"
                  />
                  <img
                      class="audioBtn"
                      v-if="openAudio == true"
                      src="../assets/sound.png"
                      @click="triggerTrack(0, false)"
                  />
                  <img
                      style="display: none"
                      class="videoBtn closeBtn"
                      v-if="openVideo == false"
                      src="../assets/video-close.png"
                      @click="triggerTrack(1, true)"
                  />
                  <img
                      style="display: none"
                      class="videoBtn"
                      v-if="openVideo == true"
                      src="../assets/video.png"
                      @click="triggerTrack(1, false)"
                  />
                </div>
                <div
                    class="screen-controls"
                    v-if="liveHouse"
                    @click="shareLiveScreen"
                >
                  <img
                      v-if="openLiveScreen === true"
                      src="../assets/screen.svg"
                  />
                  <img v-else src="../assets/screen2.svg" class="closeBtn" />
                </div>
                <div
                    class="screen-controls"
                    v-else
                    @click="testMedia"
                    style="display: none"
                >
                  <img v-if="openScreen === true" src="../assets/screen.svg" />
                  <img v-else src="../assets/screen2.svg" class="closeBtn" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
            v-show="openScreen == true"
            class="localScreen"
            @click="openVideoWrapper('self2')"
            :style="{
            'margin-left':
              activeVideo == 'self'
                ? '0px'
                : activeVideo == 'self2'
                ? '0px'
                : '15px',
          }"
            :class="{
            'localScreen-active': activeVideo === 'self2',
          }"
        >
          <div class="selfScreenLoading">
            <img src="../assets/loading.gif" />
          </div>
          <video
              id="localScreenSelf"
              muted
              style="width: 100%; height: 100%"
          ></video>
        </div>
      </div>
      <div v-show="showVideo" class="showRightList"></div>
    </div>

    <div
        class="menu"
        v-show="ifLodingComplete && mapId !== 202 && mapId !== 105"
    >
      <div
          id="message"
          :class="{ active: menuIndex === 0, tooltip: true }"
          @click="showMenuIndex(0)"
      >
        <span :class="{ message: getunreadMessage() }"></span>
        <img class="help" src="../assets/message.png" />
        <span class="tooltiptext">Chat</span>
      </div>
      <div
          v-show="mapId === 202"
          id="friends"
          :class="{ active: menuIndex === 1, tooltip: true }"
          @click="showMenuIndex(1)"
      >
        <img class="help" src="../assets/friends.png" />
        <span class="tooltiptext">Friends</span>
      </div>
      <!-- <div
        id="task"
        :class="{ active: showTask, tooltip: true }"
        @click="changeTask()"
      >
        <img class="help" src="../assets/task.png" />
        <span class="tooltiptext">Tasks</span>
      </div> -->
      <div id="offices" class="tooltip" @click="getOffice()">
        <img src="../assets/companyIcon.svg" />
        <span class="tooltiptext">Spaces</span>
      </div>
      <div
          v-show="(inviteIcon || isAdmin) && mapId === 203"
          :class="{ active: showCustomized, tooltip: true }"
          @click="
          showCustomized = !showCustomized;
          showMenu = false;
          menuIndex = -1;
          showgrid(!showCustomized ? 0 : 1);
        "
      >
        <img class="help" src="../assets/customized.png" />
        <span class="tooltiptext">Customized</span>
      </div>
      <div
          id="inviteIcon"
          class="tooltip"
          v-show="inviteIcon && (mapId === 201 || mapId === 203)"
          @click="getInvite()"
      >
        <img class="help" src="../assets/invitationIcon.png" />
        <span class="tooltiptext">Invitation</span>
      </div>
      <div id="helpBtn" class="tooltip" @click="$refs.newbee.clearHelp()">
        <img class="help" src="../assets/helpIcon.png" />
        <span class="tooltiptext">Help</span>
      </div>
    </div>

    <MenuDetail
        ref="menuDetailRef"
        v-show="showMenu"
        :menuIndex="menuIndex"
        :workStatus="workStatus"
        :vueAllTalkMsg="vueAllTalkMsg"
        :vueNearByMsg="vueNearByMsg"
        :nearBylist="nearBylist"
        :membersList="membersList"
        :everyOneList="everyOneList"
        :teamList="teamList"
        :followList="followList"
        :webRtc="webRtc"
        :vueTalkMsg="vueTalkMsg"
        :mapId="mapId"
        :isAdmin="isAdmin"
        :meetingName="meetingName"
        :currentMapId="currentMapId"
        :vueTeamMsg="vueTeamMsg"
        :sendObject="sendObject"
        :sendUser="sendUser"
        @setMenuIndex="setMenuIndex"
        @setSendObject="setSendObject"
        @setSendUser="setSendUser"
        @setFollow="setFollow"
        @closeMenu="closeMenu"
        @topTips="topTips"
        @getTeamListUnread="getTeamListUnread"
        @setShowMenu="setShowMenu"
    ></MenuDetail>

    <iframe
        src="/game/index.html"
        style="height: 100%"
        ref="games"
        id="games"
        name="games"
    />
    <div v-show="openBoard">
      <div v-drag class="boardWrapper">
        <div class="drag">
          <div><img src="../assets/drag.png" />Click here drag</div>
        </div>
      </div>

      <div id="board">
        <p
            class="board-close"
            @click="
            openBoard = false;
            setGamefocus();
          "
        >
          ×
        </p>
      </div>
    </div>

    <div class="noteWrapper" v-if="openBlocks">
      <p
          class="closeGame"
          @click="
          openBlocks = false;
          setGamefocus();
        "
      >
        ×
      </p>
      <iframe
          :src="tetrablocks"
          frameborder="0"
          allow="clipboard-write ; autoplay ; fullscreen ; picture-in-picture ;"
          ref="tetra-blocks"
          id="tetra-blocks"
          name="tetra-blocks"
          style="background-color: #1a1129"
          allowTransparency="true"
      />
    </div>

    <div class="tips-bar" v-show="showTips">
      <p style="margin-bottom: 0">{{ alert }}</p>
    </div>

    <div
        class="videoWrapper"
        v-if="showVideo"
        :style="openOrstow === true ? 'z-index:auto' : ''"
    >
      <p
          @click="
          showVideo = false;
          activeVideo = null;
          openOrstow = false;
          setGamefocus();
        "
      >
        ×
      </p>
    </div>

    <ChangeRole
        v-if="showChangeRole"
        @settingBack="settingBack"
        :openAudio="openAudio"
        :openVideo="openVideo"
        @setOpenStatus="setOpenStatus"
        :roleName="roleName"
        :role="role"
        @showChangeRole="showChangeRole = false"
        @setRoleName="setRoleName"
        @setRole="setRole"
        @changeRoleName="changeRoleName"
        :webRtc="webRtc"
        :account="account"
    >
    </ChangeRole>

    <div
        v-show="
        ifLodingComplete &&
        !showVideo &&
        mapId != 103 &&
        mapId !== 104 &&
        mapId !== 202 &&
        mapId !== 203
      "
        :class="{ miniMap: true, 'miniMap-show': showVideo }"
        @click="getMouseXY($event)"
    >
      <div class="innerMap" v-if="mapId === 101">
        <div ref="mapLocation" class="mapLocation"></div>
      </div>
      <div class="outMap" v-if="mapId === 102">
        <div ref="mapLocation" class="mapLocation out"></div>
      </div>
      <div class="smallOffice" v-if="mapId === 201">
        <div ref="mapLocation" class="mapLocation out"></div>
      </div>
      <div class="cyberMap" v-if="mapId === 105">
        <div ref="mapLocation" class="mapLocation out"></div>
      </div>
      <div class="cyberW3ball">
        Collected W3Ball: {{ alreadyPickCount }}/{{ allBallCount }}
      </div>
    </div>

    <div class="connectTip" v-show="isConnectTip">
      <div class="connectTip-center">
        <img src="../assets/connect.svg" />
        <p>MANUALLY CONNECT A WALLET</p>

        <div
            @click="getLocalAccount"
            title="ALL FUNCTIONS CAN BE ACCESSED BUT YOUR IN-GAME CREDIT WON'T BE RECORDED"
        >
          TOURIST
        </div>
        <div @click="connect" style="background-color: #8d6ef4; color: #fff">
          WALLET
          <img style="margin-left: 10px" src="../assets/browser-wallet.svg" />
        </div>
        <p style="font-size: 14px">
          Please keep in mind that we are not collecting any information from
          your wallet. If you have any concerns, link a fresh wallet or one with
          no balance.
        </p>
      </div>
    </div>

    <audio
        controls="controls"
        hidden
        src="../assets/msg.mp3"
        ref="audio"
        id="msgAudio"
    ></audio>

    <Invite
        v-show="showInvite"
        :showInvite="showInvite"
        :mapId="mapId"
        :inviteLink="inviteLink"
        @cancelBubble="cancelBubble"
        @closeInvite="
        showInvite = false;
        setGamefocus();
      "
    >
    </Invite>

    <CompanyList
        v-show="showCompany"
        :showCompany="showCompany"
        :officeStatus="officeStatus"
        :officeList="officeList"
        :office="office"
        :officeAddress="officeAddress"
        :officeType="officeType"
        :locationUrl="locationUrl"
        @cancelBubble="cancelBubble"
        @closeCompany="
        showCompany = false;
        setGamefocus();
      "
        @joinOffice="joinOffice2"
        @setOfficeInfo="setOfficeInfo"
    >
    </CompanyList>

    <div
        class="officeBg uploadLogo"
        v-if="showUploadLogo"
        @click="
        showUploadLogo = false;
        setGamefocus();
      "
    >
      <div class="officeCon" @click="cancelBubble($event)">
        <p
            class="close_frame"
            @click="
            showUploadLogo = false;
            setGamefocus();
          "
        >
          <img src="../assets/close.svg" />
        </p>
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <div class="info">
          <img :src="logoSrc" style="width: 200px; height: 200px" />
          <img
              v-show="logoSrc === null || logoSrc === ''"
              class="addLogo"
              style="position: absolute"
              src="../assets/addLogo.svg"
          />
          <input
              class="filePrew"
              type="file"
              accept=".jpg,.jpeg,.png"
              @change="addLogo($event, '')"
              ref="logoImg"
          />
          <input
              id="oldimg"
              name="oldimg"
              v-model="oldimg"
              value=""
              type="hidden"
          />
        </div>

        <div class="enterButton" @click="uploadLogo">
          <div class="text">UPLOAD</div>
        </div>

        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>

    <div
        class="pmManager"
        v-show="
        showPmInput ||
        (mapId === 202 && nearBylist[0] && nearBylist[0].sponsor == 1)
      "
        @click="showPmSetting = true"
    >
      <img src="../assets/setting.svg" />
    </div>

    <div
        v-show="
        (mapId == 202 || mapId == 105) &&
        nearBylist[0] &&
        nearBylist[0].sponsor == 1
      "
        class="amamode"
    >
      AMA Mode: {{ amaMode == 0 ? "Broadcast Mode" : "Discussion Mode" }}
      <img
          id="switchover"
          v-show="nearBylist[0] && nearBylist[0].sponsor == 1"
          src="../assets/change.png"
          @click="setAMAMode(amaMode == 0 ? 1 : 0)"
      />
    </div>

    <PmSetting
        v-show="showPmSetting"
        :showPmInput="showPmInput"
        :locationUrl="locationUrl"
        :webRtc="webRtc"
        :mapId="mapId"
        :account="account"
        :nearBylist="nearBylist"
        @closePmSetting="(showPmSetting = false), setGamefocus()"
        @topTips="topTips"
        :meetingName="meetingName"
    ></PmSetting>

    <div
        class="createOff officeBg"
        v-if="showCreateroom"
        @click="
        showCreateroom = false;
        setGamefocus();
      "
    >
      <div class="officeCon" @click="cancelBubble($event)">
        <p
            class="close_frame"
            @click="
            showCreateroom = false;
            setGamefocus();
          "
        >
          <img src="../assets/close.svg" />
        </p>
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <h2>BUILD AN OFFICE</h2>
        <div class="createOffice">
          <div style="font-weight: 700; font-size: 15px; line-height: 20px">
            Upload logo
          </div>
          <div style="margin-top: 15px">
            <img
                :src="logoSrc"
                style="
                width: 200px;
                height: 200px;
                border: 1px solid #000000;
                border-radius: 6px;
              "
            />
            <img
                v-show="logoSrc === null || logoSrc === ''"
                class="addLogo"
                style="position: absolute"
                src="../assets/addLogo.svg"
            />
            <input
                class="filePrew"
                type="file"
                accept=".jpg,.jpeg,.png"
                @change="addLogo($event, 'build')"
                ref="logoImg"
            />
          </div>
          <p>
            <input type="radio" id="0" value="0" v-model="createroomType" />
            <label @click="createroomType = 0">Standard office</label>
            <input
                type="radio"
                id="1"
                value="1"
                v-model="createroomType"
                style="margin-left: 80px"
            />
            <label @click="createroomType = 1">Customizable office</label>
          </p>
          <input
              class="input"
              v-model="createroomName"
              placeholder="OFFICE NAME"
          />
        </div>
        <div
            class="enterButton"
            @click="getCreateroom(createroomType, createroomName)"
        >
          <div class="text">BUILD</div>
        </div>

        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>

    <Customized
        v-show="showCustomized"
        @closeCustomized="
        showCustomized = false;
        setGamefocus();
        showgrid(0);
      "
        @showUploadLogo="showUploadLogo = true"
        :isAdmin="isAdmin"
        :account="account"
        :webRtc="webRtc"
        :roomid="roomid"
        :locationUrl="locationUrl"
        @topTips="topTips"
    ></Customized>

    <Task
        v-show="showTask"
        @closeTask="
        showTask = false;
        setGamefocus();
      "
        :webRtc="webRtc"
        :showTask="showTask"
        :taskTotal="taskTotal"
    ></Task>

    <NewBee
        ref="newbee"
        :helpPos="helpPos"
        :sponsor="nearBylist.length > 0 ? nearBylist[0].sponsor : 0"
        @showUploadPosters="showUploadPosters = true"
        :webRtc="webRtc"
        :ifLodingComplete="ifLodingComplete"
        @click.native="setGamefocus"
        @showPmSetting="showPmSetting = true"
        @hidePmSetting="showPmSetting = false"
        @setAMAMode="setAMAMode(1)"
        @openBoard="openBoard = true"
        @showYve="showYveguide"
        @hideYve="hideYveguide"
        @triggleAudio="triggleAudio"
        @getInvite="getInvite"
    ></NewBee>

    <Company
        v-if="showCompanyInfo"
        :companyInfo="companyInfo"
        :locationUrl="locationUrl"
        :webRtc="webRtc"
        @closeCompany="
        showCompanyInfo = false;
        setGamefocus();
      "
    ></Company>

    <UploadPosters
        v-show="showUploadPosters"
        @closeUploadPosters="
        showUploadPosters = false;
        setGamefocus();
      "
        :postersId="postersId"
        @updateMeetingBill="updateMeetingBill"
    ></UploadPosters>

    <Desk
        v-if="showDesk"
        :account="account"
        :webRtc="webRtc"
        @closeDesk="
        showDesk = false;
        setGamefocus();
      "
    ></Desk>

    <!-- <MeetingList
      v-show="showMeetingList"
      :meetingName="meetingName"
      :locationUrl="locationUrl"
      @closeMeetingTip="(showMeetingList = false), setGamefocus()"
      @openMeetingTip="showMeetingList = true"
    ></MeetingList> -->

    <Events
        v-show="showEvent"
        @cancelBubble="cancelBubble"
        @closeEvent="
        showEvent = false;
        setGamefocus();
      "
    ></Events>

    <LiveChat
        v-if="(mapId == 202 || mapId == 105) && showLiveChat"
        :webRtc="webRtc"
        :liveVideos="liveVideos"
        :membersList="membersList"
        :nearBylist="nearBylist"
        :openLiveAudio="openLiveAudio"
        :followList="followList"
        @cancelBubble="cancelBubble"
        @setLiveAudioOpen="setLiveAudioOpen"
        @setLiveAudioClose="setLiveAudioClose"
        @addFollowList="addFollowList"
        @removeFollowList="removeFollowList"
        @setGamefocus="setGamefocus"
        @connect="connect"
        :vueTalkMsg="vueTalkMsg"
        :otherInfoList="otherInfoList"
        :currentMapId="currentMapId"
        :currentLive="currentLive"
        @topTips="topTips"
        :account="account"
        :mapId="mapId"
        :alreadyPickCount="alreadyPickCount"
    ></LiveChat>

    <div class="invite officeBg" v-show="showccProfile && ifLodingComplete">
      <div class="officeCon" @click="cancelBubble($event)">
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <h2>CREATE YOUR ccPROFILE</h2>
        <div class="info">
          <p>handle(12-20 letters)</p>
          <div>
            <input
                placeholder="Please enter handle"
                id="handle"
                v-model="handle"
            />
            <span @click="createProfile()">create</span>
          </div>
        </div>
        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>

    <!-- showScrollProfile -->
    <div class="invite officeBg" v-show="showScrollProfile && ifLodingComplete">
      <div class="officeCon" @click="cancelBubble($event)">
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <h2>CREATE YOUR PROFILE</h2>
        <div class="info">
          <div>
            <input
                placeholder="Please enter handle"
                id="handle"
                v-model="handle"
            />
            <span @click="createScrollProfile()">create</span>
          </div>
        </div>
        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>

    <div
        class="invite officeBg"
        v-show="showBoard"
        @click="
        showBoard = false;
        $emit('setGamefocus');
      "
    >
      <div class="officeCon" style="width:550px" @click="cancelBubble($event)">
        <p
            class="close_frame"
            style="margin-left: 525px !important;"
            @click="
            showBoard = false;
            $emit('setGamefocus');
          "
        >
          <img src="../assets/close.svg" />
        </p>
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <h2 style="top:0px">W3Space & CyberConnect Treasure Hunt</h2>
        <div class="info">
          <p style="line-height: 28px;">
            Summoners, welcome to W3Space! W3Ball has spawned! We are excited to
            join the CyberConnect fan club. In the same time, W3Space &
            CyberConnect Treasure Hunt campaign is online! During the campaign,
            10 W3Balls will be distributed to random locations in W3Space.
            Summoners who have collected all 10 W3Balls every day will be able
            to claim a specially designed W3ST token in the CyberConnect
            conference room. (Located at the map entrance in the waterfall)
            W3Balls are refreshed at 0:00 UTC daily. Summoners, summon your
            favorite characters, collect W3Balls, and let the game start!
          </p>
        </div>
        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MyWebRTC } from "../utils/mywebrtc";
import { LiveRTC } from "../utils/livertc";
import axios from "axios";
import $ from "jquery";
import { createFastboard, createUI } from "@netless/fastboard";
import Customized from "../components/Customized.vue";
import Task from "../components/Task.vue";
import NewBee from "../components/NewBee.vue";
import Company from "../components/company.vue";
import Desk from "../components/desk.vue";
import UploadPosters from "../components/UploadPosters.vue";
import MenuDetail from "../components/MenuDetail.vue";
import PmSetting from "../components/pmSetting.vue";
import Map from "../components/map.vue";
// import MeetingList from "../components/meetingList.vue";
import ChangeRole from "../components/changeRole.vue";
import Invite from "../components/Invite.vue";
import CompanyList from "../components/CompanyList.vue";
import Events from "../components/Events.vue";
import LiveChat from "../components/LiveChat.vue";
import Web3 from "web3";

import { abi } from "../abi";
import { scrollAbi } from "../abi/scroll";

var Contract = require("web3-eth-contract");
Contract.setProvider(window.ethereum);
let W3Contract = new Contract(
    abi,
    "0x2723522702093601e6360cae665518c4f63e9da6"
);
let ScrollContract = new Contract(
    scrollAbi,
    "0x1048DbD7f513740bF0C667181fF5b88538e2DC8E"
);

export default {
  name: "VideoChat",
  components: {
    Customized,
    Task,
    UploadPosters,
    MenuDetail,
    Company,
    NewBee,
    PmSetting,
    Desk,
    Map,
    ChangeRole,
    Invite,
    CompanyList,
    Events,
    LiveChat,
  },
  // MeetingList,
  data: () => ({
    webRtc: null,
    liveRtc: null,
    vueId: "createOffer",
    vueId2: "initWebRTC",
    offerOption: {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1,
    },
    peer: null,
    account: null,
    showTips: false,
    alert: "",
    myVideo: null,
    openVideo: true,
    openAudio: true,
    listNum: 0,

    showMenu: false,
    menuIndex: null,
    message: "",
    showUserInfo: false,
    showCompanyInfo: false,
    companyInfo: {},

    membersList: [],
    nearBylist: [],
    everyOneList: [],
    teamList: [],
    teamIds: [],
    followedIds: [],
    followList: [],

    workStatus: 0,
    sendObject: "Everyone",
    sendUser: {},

    showVideo: false,
    activeVideo: null,
    openBoard: false,
    openBlocks: false,
    role: { id: 1, nftname: "", nftid: 0 },
    roleName: "",
    showChangeRole: false,

    mapId: 102,

    ifLodingComplete: false,
    isInitWebRTC: false,
    xTotal: 0,
    yTotal: 0,

    isSettingStatus: false,
    isConnectTip: false,

    miniMapW: 0,
    miniMapH: 0,
    allTalkLength: 0,
    liveChannel: "w3work",

    showInvite: false,
    showCompany: false,
    friendAddress: "",

    office: 0,
    officeStatus: 0, //0:There are already entered company lists  1:
    officeList: [],
    officeAddress: "",
    officeType: 1,

    //https://alpha.w3work.org/games/cowboy-shoot/
    tetrablocks: "",
    liveHouse: false,
    openLiveVideo: false,
    openLiveAudio: true,
    theuser: "",

    showUploadLogo: false,
    logoSrc: null,
    oldimg: "",
    logoFile: "",
    officeChannel: "",
    inviteLink: "",
    inviteIcon: false,
    joinedBoard: false,

    showPmInput: false,
    isOfficeSpace: false,
    locationUrl: "",
    showPmSetting: false,

    roomUsers: [],
    newLiveVideos: [],
    liveRoom: "",

    showCustomized: false,
    showTask: false,
    showSpeaking: false,
    isAdmin: false,
    showUploadPosters: false,
    postersId: 1,
    isdrag: false,

    showCreateroom: false,
    createroomName: "",
    createroomType: 0,
    amaMode: 0,
    helpPos: { mapid: 0, x: 0, y: 0 },
    buildLogoName: "",

    leave: false,
    taskTotal: 0,
    miniScreen: false,
    showYvette: false,
    currentMapId: 0,
    showDesk: false,
    roomid: 0,

    showMap: true,
    showExploreMap: false,

    showMeetingList: false,
    openOrstow: false,

    showEvent: false,
    showLiveChat: true,
    homeQueryother: false,

    currentLive: [],
    fps: 60,

    showccProfile: false,
    handle: "",

    showScrollProfile: false,
    ////ballinfo(alreadyPickCount, allBallCount)
    alreadyPickCount: 0,
    allBallCount: 10,
    showBoard: false,
  }),
  computed: {
    vueConns() {
      return this.$store.state.conns || [];
    },
    liveVideos() {
      return this.$store.state.liveVideos || [];
    },
    vueNearByMsg() {
      return this.$store.state.nearByMsg || [];
    },
    vueTalkMsg() {
      return this.$store.state.talkMsg || [];
    },
    vueTeamMsg() {
      return this.$store.state.teamMsg || [];
    },
    vueAllTalkMsg() {
      let msgArr = this.$store.state.nearByMsg.concat(
          this.$store.state.talkMsg
      );
      msgArr = msgArr.sort(this.sortData);

      return msgArr;
    },
    openScreen() {
      return this.$store.state.openScreen || false;
    },
    localRole() {
      return this.$store.state.role || {};
    },
    openLiveScreen() {
      return this.$store.state.openLiveScreen || false;
    },
    officeSpaceAddress() {
      return this.$store.state.officeSpaceAddress || "";
    },
    officeSpaceType() {
      return this.$store.state.officeSpaceType || 1;
    },
    meetingName() {
      return this.$store.state.meetingName || "";
    },
    otherInfoList() {
      return this.$store.state.otherInfoList || [];
    },
  },
  async created() {
    var exploreUrl = window.location.href;
    if (exploreUrl.indexOf("explore") > -1) {
      this.showExploreMap = true;
      exploreUrl = exploreUrl.replace(/(\?|#)[^'"]*/, "");
      window.history.pushState({}, 0, exploreUrl);
    }
    let self = this;
    this.role = this.localRole;
    if (window.location.href.indexOf("w3space.co") > -1) {
      this.locationUrl = "https://alpha.w3space.co";
      this.liveChannel = "w3space";
    } else if (window.location.href.indexOf("w3space.org") > -1) {
      this.locationUrl = "https://alpha.w3space.org";
      this.liveChannel = "w3spaceorg";
    } else if (window.location.href.indexOf("w3.work") > -1) {
      this.locationUrl = "https://alpha.w3.work";
      this.liveChannel = "w3";
    } else {
      this.locationUrl = "https://alpha.w3work.org";
      this.liveChannel = "w3work";
    }
    if (localStorage.getItem("useWallet") != "true") {
      this.isConnectTip = true;
    } else {
      this.connect();
    }

    // setTimeout(() => {
    //   if (!this.account) {
    //     //Please manually connect your wallet.
    //     this.alert = "Please manually connect your wallet.";
    //     this.topTips({ alert: this.alert, time: 5000 });
    //   }
    // }, 10000);

    if (window.location.href.indexOf("office") > -1) {
      let address = window.location.href.split("=");
      if (address[1]) {
        this.$store.commit("setOfficeSpaceAddress", address[1]);
        if (window.location.href.indexOf("toffice") > -1) {
          this.$store.commit("setOfficeSpaceType", 2);
        } else {
          this.$store.commit("setOfficeSpaceType", 1);
        }
        self.alert = "You've entered " + address[1] + "'s office.";
        this.topTips({ alert: self.alert, time: 5000 });
      }
    }
    if (window.location.href.indexOf("meeting") > -1) {
      let address = window.location.href.split("=");
      if (address[1]) {
        this.setMeetingName(address[1]);
      }
    }

    window[this.vueId] = (targetID) => {
      self.createOffer(targetID);
    };
    window[this.vueId2] = async (func) => {
      await self.initWebRTC();
      let href = window.location.href;
      if (href.indexOf("w3space.co") > -1) {
        func("wss://metahq.w3.work", "https://alpha.w3space.co");
      } else if (href.indexOf("w3space.org") > -1) {
        func("wss://metahq.w3work.org", "https://alpha.w3space.org");
      } else if (href.indexOf("w3.work") > -1) {
        func("wss://metahq.w3.work", "https://alpha.w3.work");
      } else if (href.indexOf("w3work") > -1) {
        func("wss://metahq.w3work.org", "https://alpha.w3work.org");
      } else {
        func("wss://wxgame.qweiyou.com:5745", "");
        // func("wss://metahq.w3.work", "https://alpha.w3space.co");
        // func("wss://metahq.w3work.org", "https://alpha.w3space.org");
      }
    };

    window["closePeer"] = async (targetID) => {
      await self.closePeer(targetID);
      // console.log("closePeer", this.vueConns);
    };
    window["meetingmode"] = async (mode) => {
      console.log("meetingmode", mode);
      this.amaMode = mode;
      if (mode == 0 && (this.mapId === 202 || this.mapId === 105)) {
        this.webRtc.sendToGdevelop("specialuser", {
          broad: 2,
        });
      }
    };
    window["setTargetIdAudioStatus"] = async (targetID, status) => {
      await this.webRtc.setTargetIdAudioStatus(targetID, status);
    };
    window["setTargetIdVideoStatus"] = async (targetID, status) => {
      await this.webRtc.setTargetIdVideoStatus(targetID, status);
    };
    window["setTargetIdScreenStatus"] = async (targetID, status) => {
      await this.webRtc.setTargetIdScreenStatus(targetID, status);
    };
    // window["connect"] = async () => {
    //   await self.connect();
    // };

    window["setMembersList"] = async (list) => {
      // console.log(list)
      this.membersList = list;
      this.getMembersUnreadNum();
    };
    window["setTeamList"] = async (list) => {
      if (this.currentMapId !== list.mapid) {
        this.currentMapId = list.mapid;
        // console.log(this.currentMapId)
        this.$store.commit("setTeamId", list.mapid);
      }
      this.teamIds = list.onceuser.split("-");
      if (list.onceuser !== "") {
        this.homeQueryother = true;
        this.webRtc.sendToGdevelop("queryother", {
          isaddress: 0,
          ids: list.onceuser,
        });
      }
    };
    window["otherInfo"] = async (list) => {
      // debugger;
      // console.log("otherInfo-----------", list);
      if (this.homeQueryother === true) {
        let arr = list.Ary;
        this.teamList = [];
        this.teamIds.forEach((item) => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == Number(item)) {
              if (i !== 0 && arr[i].status !== 3) {
                this.teamList.unshift(arr[i]);
              } else {
                this.teamList.push(arr[i]);
              }
            }
          }
        });
        // console.log(this.teamList);
        // console.log("followedIds", this.followedIds);
        arr.forEach((item) => {
          for (let i = 0; i < this.followedIds.length; i++) {
            if (item.id == Number(this.followedIds[i]))
              this.followList[i] = item;
          }
        });
        setTimeout(() => {
          // console.log(this.followList);
          if (this.followList.length > 0) {
            for (let i = 0; i < this.followList.length; i++) {
              this.webRtc.sendToGdevelop("querychat", {
                targetID: this.followList[i].id,
              });
            }
          }
        }, 1000);

        // console.log("this.followList ", this.followList);
        // console.log(this.teamList);
      } else {
        let arr = list.Ary;
        if (arr.length > 0) {
          if (this.otherInfoList.length > 0) {
            let newArr = this.otherInfoList;
            arr.forEach((item) => {
              let info = this.otherInfoList.filter((val) => item.id === val.id);
              if (info.length < 1) {
                newArr.push(item);
              } else {
                newArr.forEach((other, index) => {
                  if (
                      item.id == other.id &&
                      (item.nickname != other.nickname ||
                          item.image != other.image ||
                          item.nftid !== other.nftid)
                  ) {
                    // console.log("------------");
                    newArr[index] = item;
                    // console.log(newArr)
                  }
                });
              }
            });
            this.$store.commit("setInfoList", JSON.stringify(newArr));
          } else {
            this.$store.commit("setInfoList", JSON.stringify(arr));
          }
        }
      }
      this.homeQueryother = false;
    };
    window["setMyself"] = async (list) => {
      // console.log("myself", list);
      this.taskTotal = list.score;
      // debugger;
      let followArr = Array.from(new Set(list.follow.split("-")));
      // console.log(followArr);
      followArr.forEach((item) => {
        // console.log(item);
        if (item && item != "") {
          this.followedIds.push(item);
        }
      });
      // this.followedIds = Array.from(new Set(list.follow.split("-")));
      // console.log("this.followedIds ", this.followedIds);

      setTimeout(() => {
        if (list.follow !== "") {
          this.homeQueryother = true;
          this.webRtc.sendToGdevelop("queryother", {
            isaddress: 0,
            ids: JSON.stringify(list.follow),
          });
        }
        this.webRtc.sendToGdevelop("getOffice", {});
      }, 5000);
      this.isPm();
    };
    window["locationReload"] = async () => {
      // let a = Number(localStorage.getItem("reloadTime")) + 1
      // localStorage.setItem("reloadTime", a)
      location.reload();
    };
    window["setNearByList"] = async (list) => {
      this.nearBylist = list;
      // console.log(this.nearBylist)

      this.getNearByUnreadNum();
      if (
          this.nearBylist[0].sponsorLive == 0 &&
          this.liveHouse == true &&
          this.nearBylist[0].sponsor != 1 &&
          (this.mapId === 103 || this.mapId === 202)
      ) {
        this.leaveLive();
      }
    };
    window["openBoard"] = async () => {
      this.openBoard = true;
      if (!this.joinedBoard) this.mountFastboard();
    };
    window["joinAsHost"] = async (id) => {
      await this.leaveLive();
      this.leave = false;
      console.log("joinAsHost");
      this.liveRoom = id;
      await this.joinAsHost();
      if (this.mapId == 105) {
        this.webRtc.sendToGdevelop("playplatform", {});
      }
      this.webRtc.sendToGdevelop("showSpeaking", { status: 1 });
      this.timer = setInterval(() => {
        this.getRoomUserList();
        this.checkSpeaking();
      }, 1500);

      if (this.mapId === 202 || this.mapId === 105) {
        this.webRtc.sendToGdevelop("specialuser", { broad: 1 });
      }
    };
    window["joinAsCall"] = async (id) => {
      this.leave = false;
      this.liveRoom = id;
      await this.joinAsCall(id);
      this.webRtc.sendToGdevelop("showSpeaking", { status: 1 });
      this.timer = setInterval(() => {
        this.getRoomUserList();
        this.checkSpeaking();
      }, 1500);
    };
    window["joinAsAudience"] = async (id) => {
      await this.leaveLive();
      this.leave = false;
      console.log("joinAsAudience");
      this.liveRoom = id;
      await this.joinAsAudience();
      this.timer = setInterval(() => {
        this.getRoomUserList();
      }, 1500);
    };
    window["leaveLive"] = async () => {
      this.leaveLive();
    };
    window["openBlocks"] = async () => {
      this.openBlocks = true;
    };
    window["talk"] = async (info) => {
      this.$store.commit("addTalkMsg", info);
    };
    window["getScreenParam"] = async (mapId, func) => {
      let fps = this.fps < 60 ? 60 : this.fps;
      if (mapId === 101) {
        func(
            document.getElementById("games").offsetWidth * 1.2,
            document.getElementById("games").offsetHeight * 1.2,
            fps
        );
      } else {
        func(
            document.getElementById("games").offsetWidth,
            document.getElementById("games").offsetHeight,
            fps
        );
      }

      // console.log("fps",this.fps,fps)
    };
    window["setPosition"] = async (mapid, x, y, xTotal, yTotal, roomid) => {
      if (mapid == 102 && (x == 26 || x == 27) && y == 23) {
        // console.log(mapid, x, y);
        this.webRtc.sendToGdevelop("meetinglist", {});
      }
      this.roomid = roomid;
      this.ifLodingComplete = true;
      this.currentLocation(mapid, x, y, xTotal, yTotal);
      //var url = window.location.href;
      // if (url.indexOf("?") != -1 && url.indexOf("meeting") == -1) {
      //   url = url.replace(/(\?|#)[^'"]*/, "");
      //   window.history.pushState({}, 0, url);
      // }
      if (mapid === 202) {
        this.inviteLink = this.locationUrl + "/?meeting=" + this.meetingName;
      } else if (mapid == 201) {
        this.inviteLink = this.locationUrl + "/?office=" + this.account;
      } else {
        this.inviteLink = this.locationUrl + "/?toffice=" + this.account;
      }
    };

    window["setPeerStatus"] = async (arr) => {
      this.webRtc.checkPeerStatus(arr);
    };
    window.addEventListener("beforeunload", () => {
      try {
        this.leaveLive();
      } catch (error) {
        console.log(error);
      }
    });

    window["setOfficeList"] = async (list) => {
      // console.log("list", list);
      let ofList = list.Ary;
      for (let i = 0; i < ofList.length; i++) {
        ofList[i].type = 1;
      }
      this.officeList = ofList;
    };
    window["setThingOfficeList"] = async (list) => {
      let ofList = list.Ary;
      for (let i = 0; i < ofList.length; i++) {
        ofList[i].type = 2;
      }
      this.officeList = this.officeList.concat(ofList);
      this.opOfficeList();
      // console.log(this.officeList);
    };

    window["openOffice"] = async () => {
      this.getOffice();
    };

    window["openUploadLogo"] = async () => {
      if (this.mapId !== 202 && this.mapId !== 203) {
        if (
            this.officeSpaceAddress.toLowerCase() === this.account ||
            this.isAdmin
        ) {
          this.showUploadLogo = true;
        }
      }
    };
    window["enterW3Office"] = async () => {
      this.joinOffice(1000000, "0xC55778b68D47B34b9ccBAE534E918719Ce1E099E");
    };

    window["errtip"] = async (res) => {
      if (window.location.href.indexOf("meeting") > -1) {
        if (res === 1) {
          this.alert = "Room doesn't exist.";
        } else if (res === 2) {
          this.alert = "Meeting has ended.";
        } else if (res === 3) {
          this.alert =
              "Attendees are allowed to enter the room 15 minutes before the meeting begins.";
        } else if (res === 4) {
          this.alert = "You have been banned from the meeting.";
        }
        this.topTips({ alert: this.alert, time: 3000 });
      }
      if (res === 100) {
        this.alert = "An office using this name already exists.";
        this.topTips({ alert: this.alert, time: 3000 });
      }
    };

    window["createRoomOK"] = async () => {
      await this.getOffice2();
      if (parseInt(this.createroomType) === 0) {
        //http://localhost:8080/
        window.open(this.locationUrl + "?office=" + this.account, "_self");
      } else {
        window.open(this.locationUrl + "?toffice=" + this.account, "_self");
      }
    };

    //forbid
    window["forbid"] = async () => {
      this.alert = "You have been banned from the meeting.";
      this.topTips({ alert: this.alert, time: 3000 });
    };

    window["openUploadBill"] = async (id) => {
      if (
          this.officeSpaceAddress.toLowerCase() === this.account ||
          this.isAdmin
      ) {
        this.postersId = id;
        this.showUploadPosters = true;
      }
    };
    window["queryRoomInfoOK"] = async (info) => {
      this.companyInfo = info;
      if (
          this.companyInfo.address.toLowerCase() == this.account.toLowerCase()
      ) {
        this.companyInfo.setAble = true;
      }
      // this.companyInfo = {...this.companyInfo,...info}
      // console.log("this.companyInfo", this.companyInfo);
      this.showCompanyInfo = true;
    };
    window["openPlate"] = async (info) => {
      // this.companyInfo.id = Number(info)
      this.webRtc.sendToGdevelop("queryroominfo", { roomid: Number(info) });
    };
    window["follow"] = async (item) => {
      let id = item.id.toString();
      if (this.followedIds.indexOf(id) < 0) this.followedIds.push(id);
      if (id) {
        this.homeQueryother = true;
        this.webRtc.sendToGdevelop("queryother", { isaddress: 0, ids: id });
      }
    };
    window["notFollow"] = async (item) => {
      let id = item.id.toString();
      if (this.followedIds.indexOf(id) > -1)
        this.followedIds.splice(this.followedIds.indexOf(id), 1);
      for (let i = 0; i < this.followList.length; i++) {
        if (this.followList[i].id == item.id) {
          this.followList.splice(i, 1);
        }
      }
    };

    window["specialuser"] = async (list) => {
      if (this.mapId === 202 || this.mapId === 105) {
        console.log("live data---------------------", list);
        this.currentLive = list.Ary;
      }
    };

    //ballinfo(alreadyPickCount, allBallCount)
    window["ballinfo"] = async (alreadyPickCount, allBallCount) => {
      this.alreadyPickCount = alreadyPickCount;
      this.allBallCount = allBallCount;
    };

    //openCyberBoard
    window["openCyberBoard"] = async () => {
      this.showBoard = true;
    };

    this.checkPeerStatus();
  },
  async mounted() {
    this.$refs.games.contentWindow.addEventListener("click", () => {
      if (this.showUserInfo == true) {
        this.showUserInfo = false;
      }
    });

    this.getFps();
    this.allTalkLength = this.vueAllTalkMsg ? this.vueAllTalkMsg.length : 0;
    this.tetrablocks = this.locationUrl + "/games/cowboy-shoot/";
    if (window.devicePixelRatio <= 1) {
      document.querySelector(".home").style.setProperty("--width", "200px");
      document.querySelector(".home").style.setProperty("--height", "150px");
      document.querySelector(".home").style.setProperty("--settingW", "150px");
      document.querySelector(".home").style.setProperty("--screenLeft", "30px");
      document
          .querySelector(".home")
          .style.setProperty("--localAreaTop", "30px");
      document
          .querySelector(".home")
          .style.setProperty("--localAreaRight", "255px");
      document.querySelector(".home").style.setProperty("--showV", "200px");
      document.querySelector(".home").style.setProperty("--showVTop", "415px");
      document.querySelector(".home").style.setProperty("--showVRight", "60px");
      document.querySelector(".home").style.setProperty("--iconWidth", "18px");
      document
          .querySelector(".home")
          .style.setProperty("--borderWidth", "40px");
      document.querySelector(".home").style.setProperty("--miniMapTop", "30px");
      document.querySelector(".home").style.setProperty("--topM", "270px");
      document.querySelector(".home").style.setProperty("--tipTop", "190px");
      document.querySelector(".home").style.setProperty("--tipLeft", "12px");
      document
          .querySelector(".home")
          .style.setProperty("--showRightListP", "15px");
      document
          .querySelector(".home")
          .style.setProperty("--localAreaShowRight", "85px");
    } else {
      this.miniScreen = true;
    }
    this.miniMapW = $(".miniMap").width();
    this.miniMapH = $(".miniMap").height();
  },
  methods: {
    getConnectType() {
      if (!this.account || localStorage.getItem("useWallet") != "true") {
        return true;
      }
      return false;
    },
    changeMap() {
      if (this.showUserInfo == true) {
        this.showUserInfo = false;
      }
    },
    getFps() {
      const getScreenFps = (() => {
        const nextFrame = [
          window.requestAnimationFrame,
          window.webkitRequestAnimationFrame,
          window.mozRequestAnimationFrame,
        ].find((fn) => fn);
        if (!nextFrame) {
          console.error("requestAnimationFrame is not supported!");
          return;
        }
        return (targetCount = 50) => {
          const beginDate = Date.now();
          let count = 0;
          return new Promise((resolve) => {
            (function log() {
              nextFrame(() => {
                if (++count >= targetCount) {
                  const diffDate = Date.now() - beginDate;
                  const fps = (count / diffDate) * 1000;
                  return resolve(fps);
                }
                log();
              });
            })();
          });
        };
      })();

      getScreenFps().then((fps) => {
        // console.log("frameRate", parseInt(fps));
        this.fps = parseInt(fps);
      });
    },
    showgrid(id) {
      this.webRtc.sendToGdevelop("showgrid", {
        set: id,
      });
    },
    addFollowList(res) {
      this.otherInfoList.forEach((item) => {
        if (item.id === res.TargetID) {
          this.followList.push(item);
        }
      });
      // console.log("addfollow", this.followList);
    },
    removeFollowList(data) {
      this.followList.forEach((item, index) => {
        if (item.id === data.TargetID) {
          this.followList.splice(index, 1);
        }
      });
    },
    goSendMsg(item) {
      let itemArr = {
        id: item.targetID,
        nickname: item.name,
        image: item.image,
      };
      this.showMenu = true;
      if (itemArr.id !== this.nearBylist[0].id) {
        this.menuIndex = 0;
        this.sendObject = itemArr.nickname;
        this.sendUser = itemArr;
        this.msgList = this.vueTalkMsg.filter(
            (val) =>
                ((val.sender === this.sendUser.id &&
                    val.target === this.nearBylist[0].id) ||
                    (val.sender === this.nearBylist[0].id &&
                        val.target === this.sendUser.id)) &&
                val.target !== 1
        );
        this.$store.commit("addReadStatus", itemArr);
      }
    },
    setOfficeInfo(data) {
      this.office = data.office;
      this.officeAddress = data.officeAddress;
      this.officeType = data.officeType;
    },
    changeRoleName(data) {
      this.role.name = data;
    },
    setRole(data) {
      if (data.name == "") {
        this.role.id = data.id;
        this.role.nftname = "";
        this.role.nftid = 0;
      } else {
        this.role.id = data.name + data.id;
        this.role.nftname = data.name;
        this.role.nftid = data.id;
      }
    },
    setRoleName(data) {
      this.roleName = data;
    },
    ClickopenOrstow() {
      this.openOrstow = !this.openOrstow;
    },
    getShowMap() {
      if ((this.showMap && this.isConnectTip) || this.showExploreMap) {
        return true;
      }
      return false;
    },

    setMeetingName(e) {
      this.$store.commit("setMeetingName", e);
    },

    getTeamListUnread() {
      if (this.vueTeamMsg != null && this.vueTeamMsg != []) {
        let count = 0;
        this.vueTeamMsg.forEach((v) => {
          if (
              v.sender !== this.nearBylist[0].id &&
              !v.read &&
              v.target === this.currentMapId
          ) {
            count = count + 1;
          }
        });
        this.teamList.forEach((v, i) => {
          let userList = this.vueTalkMsg.filter(
              (val) => val.sender === v.id && val.target !== 1
          );
          let userCount = 0;
          userList.forEach((v) => {
            if (v.sender !== this.nearBylist[0].id && !v.read) {
              userCount = userCount + 1;
            }
          });
          this.teamList[i].unreadNum = userCount;
        });
        this.teamList.unreadNum = count;
        // console.log(this.teamList);
      }
    },

    triggleAudio() {
      if (this.liveHouse) {
        if (this.openLiveAudio == true) {
          this.setLiveAudioClose();
        } else {
          this.setLiveAudioOpen();
        }
      } else {
        let status = this.openAudio === false ? true : false;
        this.triggerTrack(0, status);
      }
    },
    async getLocalAccount() {
      localStorage.setItem("userAddress", "");
      const web3 = new Web3();
      let a = web3.eth.accounts.create("w3work");
      this.account = a.address.toLowerCase();
      localStorage.setItem("useWallet", false);
      if (!this.webRtc) {
        await this.initWebRTC();
      }
      this.showChangeRole = true;
    },
    showYveguide() {
      if (this.showYvette) return;
      // let user = {
      //   hasAudioTrack: true,
      //   hasVideoTrack: true,
      //   image: 1,
      //   loadingStatus: false,
      //   speakingLevel: 20,
      //   status: 1,
      //   uid: "Yvette",
      // };
      // this.liveVideos.push(user);
      // this.showYvette = true;
    },
    hideYveguide() {
      this.liveVideos.splice(0, 1);
      this.showYvette = false;
    },
    changeTask() {
      this.showMenu = false;
      this.showTask = true;
      this.menuIndex = -1;
      this.webRtc.sendToGdevelop("scoreinfo", {});
    },
    topTips(data) {
      this.alert = data.alert;
      this.showTips = true;
      setTimeout(() => {
        this.showTips = false;
      }, data.time);
    },
    closeMenu() {
      this.showMenu = false;
      this.menuIndex = -1;
      this.setGamefocus();
    },
    setAMAMode(e) {
      if (this.nearBylist[0] && this.nearBylist[0].sponsor == 1) {
        this.webRtc.sendToGdevelop("setmeetingmode", { mode: e });
        console.log("set mode ", e);
      }
    },
    getCreateroom(type, name) {
      // console.log(type, name, this.buildLogoName);
      if (name !== "") {
        if (this.officeList.length !== 0) {
          let isCreate = false;
          if (parseInt(type) === 0) {
            this.officeList.forEach((data) => {
              if (
                  data.address.toLowerCase() === this.account &&
                  data.type === 1
              ) {
                isCreate = true;
                this.alert = "You have an existed Standard Office.";
                this.topTips({ alert: this.alert, time: 3000 });
                return;
              }
            });
          }
          if (parseInt(type) === 1) {
            this.officeList.forEach((data) => {
              if (
                  data.address.toLowerCase() === this.account &&
                  data.type === 2
              ) {
                isCreate = true;
                this.alert = "You have an existed Customizable Office.";
                this.topTips({ alert: this.alert, time: 3000 });
                return;
              }
            });
          }

          if (!isCreate) {
            this.webRtc.sendToGdevelop("createroom", {
              name: name,
              type: parseInt(type),
              logo: this.buildLogoName,
            });
            this.showCreateroom = false;
            this.logoSrc = "";
            this.logoFile = "";
            this.buildLogoName = "";
          }
        } else {
          this.webRtc.sendToGdevelop("createroom", {
            name: name,
            type: parseInt(type),
            logo: this.buildLogoName,
          });
          this.showCreateroom = false;
          this.logoSrc = "";
          this.logoFile = "";
          this.buildLogoName = "";
        }
      }
    },
    setMenuIndex(data) {
      this.menuIndex = data;
    },
    setShowMenu(data) {
      this.showMenu = data;
    },
    setSendObject(data) {
      this.sendObject = data;
    },
    setSendUser(data) {
      this.sendUser = data;
    },
    setFollow(data) {
      if (data.status == true) {
        this.followList.push(data.item);
        this.followedIds.push(data.item.id.toString());
      } else {
        let i = this.followList.indexOf(data.item);
        this.followList.splice(i, 1);
        this.followedIds.splice(i, 1);
      }
    },
    async checkSpeaking() {
      let volumn = 0;
      try {
        volumn = await this.liveRtc.getVolumeLevel();
      } catch (error) {
        console.log(error);
      }
      let a = volumn >= 0.2;
      let status = volumn >= 0.2 ? 2 : 3;
      if (a != this.showSpeaking) {
        // console.log(status);
        this.webRtc.sendToGdevelop("showSpeaking", {
          status: status,
        });
        this.showSpeaking = a;
      }
    },
    isPm() {
      this.webRtc.sendToGdevelop("ispm", (res) => {
        this.isAdmin = res === 0 ? false : true;
        if (this.isAdmin) {
          this.showPmInput = true;
        }
      });
    },
    updateMeetingBill(data) {
      this.webRtc.sendToGdevelop("updateMeetingBill", data);
    },
    setOpenStatus(type) {
      let status;
      if (type === "sound") {
        status = this.openAudio === false ? true : false;
        this.triggerTrack(0, status);
      } else {
        status = this.openVideo === false ? true : false;
        this.triggerTrack(1, status);
      }
    },
    getShowControls(uid) {
      if (uid == "Yvette") return true;
      if (uid) {
        let id = uid.toString().slice(0, 4);
        if (parseInt(id) < 9000) {
          return true;
        }
      }
    },
    async getRoomUserList() {
      let res = await axios.get(
          this.locationUrl + "/mgr/user/list/" + this.liveChannel + this.liveRoom
      );
      // console.log("res", res.data.data);
      if (res.data.data.channel_exist === true) {
        if (
            res.data.data.mode === 2 &&
            (this.liveRoom === 103 || this.mapId === 202 || this.mapId === 105)
        ) {
          this.roomUsers = res.data.data.broadcasters;
        } else {
          this.roomUsers = res.data.data.users;
        }
        if (this.roomUsers && !this.leave) {
          // debugger
          for (var i = 0; i < this.roomUsers.length; i++) {
            if (this.liveVideos.length > 0) {
              if (this.roomUsers[i] === this.liveVideos[0].uid && i !== 0) {
                let newList = this.roomUsers;
                newList.unshift(newList[i]);
                newList.splice(i + 1, 1);
                this.roomUsers = newList;
              }
            }

            var arrindex = this.liveVideos.findIndex((item) => {
              return item.uid === this.roomUsers[i];
            });
            if (arrindex == -1) {
              let uid = (this.roomUsers[i] % 100000) + 1010000000;
              let userList;
              if (this.mapId == 105 || this.mapId == 202) {
                userList = this.currentLive.concat(this.nearBylist);
              } else {
                userList = this.membersList.concat(this.nearBylist);
              }
              let status, image, sponsor;
              for (let k = 0; k < userList.length; k++) {
                if (userList[k].id == uid) {
                  status = userList[k].status;
                  image = userList[k].image;
                  sponsor = userList[k].sponsor;
                }
              }

              let user = {
                hasAudioTrack: false,
                image: image,
                loadingStatus: undefined,
                speakingLevel: 0,
                status: status ? status : 0,
                uid: this.roomUsers[i],
                sponsor: sponsor,
              };
              this.liveVideos.push(user);
            } else {
              for (var j = 0; j < this.liveVideos.length; j++) {
                var arrindex1 = this.roomUsers.findIndex((item) => {
                  return item === this.liveVideos[j].uid;
                });
                if (arrindex1 == -1) {
                  this.liveVideos[j].hidden = true;
                } else {
                  this.liveVideos[j].hidden = false;
                }
              }
            }
          }
        }
      }
    },

    goW3Link() {
      if (window.location.href.indexOf("w3space.co") > -1) {
        window.open("https://alpha.w3space.co?explore", "_self");
      } else if (window.location.href.indexOf("w3space.org") > -1) {
        window.open("https://alpha.w3space.org?explore", "_self");
      } else if (window.location.href.indexOf("w3.work") > -1) {
        window.open("https://alpha.w3.work?explore", "_self");
      } else {
        window.open("https://alpha.w3work.org?explore", "_self");
      }
    },

    checkPeerStatus() {
      if (!this.timecheck) {
        this.timecheck = setInterval(() => {
          try {
            let arrs = this.vueConns;

            if (arrs.length > 0) {
              let arr = [];
              arrs.forEach((peer) => {
                if (peer != 0) arr.push(peer.targetID);
              });
              this.webRtc.sendToGdevelop("getPeers", {
                targetID: arr,
              });
            }
          } catch (error) {
            console.log(error);
          }
        }, 2000);
      }
    },
    //202  105
    getLiveImg(id) {
      let arr = 1;
      if (this.currentLive) {
        for (let i = 0; i < this.currentLive.length; i++) {
          if (this.currentLive[i].id == id) {
            arr = this.currentLive[i];
          }
        }
      }
      return this.getRoleImg(arr);
    },
    getNearByImg(id) {
      let arr = 1;
      for (let i = 0; i < this.nearBylist.length; i++) {
        if (this.nearBylist[i].id == id) {
          arr = this.nearBylist[i];
        }
      }
      return this.getRoleImg(arr);
    },
    getRoleImg(image) {
      if (image == 1) {
        return require("../assets/avatar" + 1 + ".png");
      }
      if (
          image !== undefined &&
          (image.nftname == "" || image.nftname == undefined)
      ) {
        return require("../assets/avatar" + image.image + ".png");
      }
      if (image !== undefined && image.nftname !== "") {
        switch (image.nftname) {
          case "BAYC":
            return (
                "https://bayc2.oss-cn-shenzhen.aliyuncs.com/pfp/BAYC" +
                image.nftid +
                ".png"
            );
          case "Doodles":
            return (
                "https://doodles.oss-cn-shenzhen.aliyuncs.com/pfp/Doodles" +
                image.nftid +
                ".png"
            );
          case "Mfers":
            return (
                "https://mfers2.oss-cn-shenzhen.aliyuncs.com/pfp/Mfers" +
                image.nftid +
                ".png"
            );
          case "MoonBirds":
            return (
                "https://moonbirds.oss-cn-shenzhen.aliyuncs.com/pfp/MoonBirds" +
                image.nftid +
                ".png"
            );
          case "CoolCats":
            return (
                "https://coolcats.oss-cn-shenzhen.aliyuncs.com/pfp/CoolCats" +
                image.nftid +
                ".png"
            );
          case "OkayBears":
            return (
                "https://OkayBears.oss-cn-shenzhen.aliyuncs.com/pfp/OkayBears" +
                image.nftid +
                ".png"
            );
            // case "WeirdoGhostGang":
            //   return (
            //     "https://WeirdoGhostGang.oss-cn-shenzhen.aliyuncs.com/pfp/WeirdoGhostGang" +
            //     image.nftid +
            //     ".png"
            //   );
          default:
            return (
                "https://bayc2.oss-cn-shenzhen.aliyuncs.com/pfp/BAYC" +
                image.nftid +
                ".png"
            );
        }
      }
    },
    async mountFastboard() {
      createFastboard({
        sdkConfig: {
          appIdentifier: "IC3ZQPd2EeybmIPzVdZGtQ/pGsgiaJ5leTDBQ",
          region: "us-sv",
        },
        joinRoom: {
          uid: this.nearBylist[0].nickname,
          uuid: "e4e87050f77711eca02e733e5e34d008",
          roomToken:
              "NETLESSROOM_YWs9TEFoNF9RcFRkTzVWSG9YZyZub25jZT0xNjU2NDg5NzM0ODAxMDAmcm9sZT0wJnNpZz04MGNmMTcwMWQ2MzIyNWQ0YmNhMTllZWEwMGNmY2YzYWQ2NDM0OWY1MTZhZWJmODU2OWJhNWQyZDc2N2YxMGYzJnV1aWQ9ZTRlODcwNTBmNzc3MTFlY2EwMmU3MzNlNWUzNGQwMDg",
        },
        managerConfig: {
          cursor: true,
        },
      }).then((app) => {
        createUI(app, document.getElementById("board"));
        this.joinedBoard = true;
      });
    },
    setGamefocus() {
      setTimeout(() => {
        this.$refs.games.contentWindow.document
            .getElementById("GameCanvas")
            .focus();
      }, 100);
    },
    opOfficeList() {
      if (this.officeList.length <= 0) {
        this.officeStatus = 1;
      } else {
        this.officeStatus = 0;
        this.office = this.officeList[0].mapid;
        this.officeAddress = this.officeList[0].address;
      }
    },
    addLogo(e, type) {
      var that = this;
      that.logoFile = e.target.files[0];
      var f = new FileReader();
      if (type === "meeting") {
        f.readAsDataURL(this.$refs.meetingLogoImg.files[0]);
        f.onload = function () {
          that.meetingLogoSrc = f.result;
        };
      } else if (type === "build") {
        f.readAsDataURL(this.$refs.logoImg.files[0]);
        f.onload = function () {
          that.logoSrc = f.result;
        };
        this.uploadBuildLogo();
      } else {
        f.readAsDataURL(this.$refs.logoImg.files[0]);
        f.onload = function () {
          that.logoSrc = f.result;
        };
      }
    },
    uploadBuildLogo() {
      if (this.logoFile) {
        let formData = new FormData();
        formData.append("icon", this.logoFile);
        formData.append("oldimg", JSON.stringify(this.oldimg));
        let url;
        if (parseInt(this.createroomType) === 0) {
          url = this.locationUrl + "/roomicon/index.php";
        } else {
          url = this.locationUrl + "/thingroomicon/index.php";
        }
        axios
            .post(url, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              if (res.data !== "error") {
                this.buildLogoName = res.data;
              }
            });
      }
    },
    uploadLogo() {
      if (this.logoFile) {
        let formData = new FormData();
        formData.append("icon", this.logoFile);
        formData.append("oldimg", JSON.stringify(this.oldimg));
        let url;
        if (this.officeSpaceType === 1) {
          url = this.locationUrl + "/roomicon/index.php";
        } else {
          url = this.locationUrl + "/thingroomicon/index.php";
        }
        axios
            .post(url, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              console.log(res);
              if (res.data !== "error") {
                if (this.officeSpaceType === 1) {
                  this.webRtc.sendToGdevelop("updateroom", res.data);
                } else {
                  this.webRtc.sendToGdevelop("updatethingroom", res.data);
                }
                this.showUploadLogo = false;
                this.logoSrc = "";
                this.logoFile = "";
              }
            });
      }
    },
    async getOffice() {
      this.showMenu = false;
      this.menuIndex = -1;
      this.showCompany = !this.showCompany;
      this.webRtc.sendToGdevelop("getOffice", {});
      this.webRtc.sendToGdevelop("getThingOffice", {});
    },
    async getOffice2() {
      this.webRtc.sendToGdevelop("getOffice", {});
      this.webRtc.sendToGdevelop("getThingOffice", {});
    },
    getInvite() {
      this.showMenu = false;
      this.menuIndex = -1;
      this.showInvite = !this.showInvite;
    },
    joinOffice2(data) {
      this.joinOffice(data.office, data.officeAddress);
    },
    joinOffice(office, officeAddress) {
      if (this.officeType === 1) {
        this.webRtc.sendToGdevelop("joinOffice", { id: office });
      } else {
        this.webRtc.sendToGdevelop("joinThingOffice", { id: office });
      }
      this.showCompany = false;
      this.$store.commit("setOfficeSpaceAddress", officeAddress);
      this.$store.commit("setOfficeSpaceType", this.officeType);
      if (officeAddress.toLowerCase() === this.account) {
        this.inviteIcon = true;
        if (this.officeType === 1) {
          this.inviteLink = this.locationUrl + "/?office=" + this.account;
        } else {
          this.inviteLink = this.locationUrl + "/?toffice=" + this.account;
        }
      } else {
        this.inviteIcon = false;
      }
    },

    findUserName(e) {
      // let a = e > 2e9 ? e - 1e9 : e;
      let a = (e % 100000) + 1010000000;
      let userList;
      if (this.mapId == 105 || this.mapId == 202) {
        userList = this.currentLive.concat(this.nearBylist);
      } else {
        userList = this.membersList.concat(this.nearBylist);
      }

      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == a) return userList[i].nickname;
      }
      return e;
    },
    getLiveUid(e) {
      let id = e.toString().slice(0, 4);
      let a = (e % 100000) + 1010000000;
      if (parseInt(id) < 9000 && a === this.nearBylist[0].id) {
        return true;
      }
      return false;
    },
    setLiveAudioOpen() {
      this.liveRtc.openAudio();
      this.openLiveAudio = true;
      // console.log(1);
      this.webRtc.sendToGdevelop("showSpeaking", { status: 1 });
    },
    setLiveAudioClose() {
      this.liveRtc.closeAudio();
      this.openLiveAudio = false;
      // console.log(4);
      this.webRtc.sendToGdevelop("showSpeaking", { status: 4 });
    },
    async openLiveVideos() {
      this.liveRtc.openVideo();
      this.openLiveVideo = true;
    },
    async closeLiveVideos() {
      this.liveRtc.closeVideo();
      this.openLiveVideo = false;
    },

    async shareLiveScreen() {
      if (
          this.nearBylist[0].sponsor == 1 ||
          this.nearBylist[0].sponsorLive == 1 ||
          this.mapId === 201 ||
          this.mapId === 104 ||
          this.mapId === 203
      ) {
        if (!this.liveRtc) this.liveRtc = new LiveRTC();
        let aa =
            (parseInt(Math.random() * 1000) + 9000) * 100000 +
            (this.nearBylist[0].id % 100000);
        // let aa = this.nearBylist[0].id + 1e9 || null;
        // console.log("uid", aa);
        let token = await axios.post(
            this.locationUrl + "/api/fetch_rtc_token",
            {
              uid: aa,
              channelName: this.liveChannel + this.liveRoom,
              role: 1,
            }
        );

        let isHost =
            this.mapId === 103 || this.mapId === 202 || this.mapId === 105;

        let res = this.liveRtc.startScreenShare(
            this.liveChannel + this.liveRoom,
            token.data.token,
            aa,
            isHost
        );
        if (res) this.$store.commit("setOpenLiveScreen", true);
      }
    },
    async leaveLive() {
      console.log("leave");
      clearInterval(this.timer);
      this.timer = null;
      this.leave = true;
      this.roomUsers = [];
      if (this.liveRtc) {
        if (this.mapId == 103 || this.mapId === 202 || this.mapId === 105) {
          await this.liveRtc.leave(this.liveChannel + this.roomid);
        } else {
          await this.liveRtc.leave(this.officeChannel);
        }
        this.openLiveVideo = false;
        this.openLiveAudio = true;
      }
      // console.log("leaveLive", 4);
      this.webRtc.sendToGdevelop("showSpeaking", { status: 4 });
      this.liveHouse = false;
      this.$store.commit("setOpenLiveScreen", false);
    },
    async joinAsAudience() {
      if (!this.liveRtc) this.liveRtc = new LiveRTC();
      let id =
          (parseInt(Math.random() * 8000) + 1000) * 100000 +
          (this.nearBylist[0].id % 100000);
      let token = await axios.post(this.locationUrl + "/api/fetch_rtc_token", {
        uid: id || null,
        channelName: this.liveChannel + this.liveRoom,
        role: 2,
      });
      // console.log(token);
      this.liveRtc.joinAsAudience(
          this.liveChannel + this.liveRoom,
          token.data.token,
          id || null
      );
    },
    async joinAsHost() {
      if (!this.liveRtc) this.liveRtc = new LiveRTC();
      let id =
          (parseInt(Math.random() * 8000) + 1000) * 100000 +
          (this.nearBylist[0].id % 100000);
      console.log(id);
      let token = await axios.post(this.locationUrl + "/api/fetch_rtc_token", {
        uid: id || null,
        channelName: this.liveChannel + this.liveRoom,
        role: 1,
      });
      this.liveRtc.joinAsHost(
          this.liveChannel + this.liveRoom,
          token.data.token,
          id || null
      );
      this.liveHouse = true;
    },
    async joinAsCall(channel) {
      console.log("joinAsCall", channel);
      if (!this.liveRtc) this.liveRtc = new LiveRTC();
      let id =
          (parseInt(Math.random() * 8000) + 1000) * 100000 +
          (this.nearBylist[0].id % 100000);
      let token = await axios.post(this.locationUrl + "/api/fetch_rtc_token", {
        // uid: this.nearBylist[0].id || null,
        uid: id || null,
        channelName: this.liveChannel + channel,
        role: 1,
      });
      this.liveRtc.joinAsCall(
          this.liveChannel + channel,
          token.data.token,
          id || null
      );
      this.liveHouse = true;
      this.officeChannel = channel;
    },

    getHeadImg(conn, id) {
      let that = this;
      let arrList = that.membersList.concat(that.nearBylist);
      if (arrList.length !== 0 && id !== undefined) {
        arrList.forEach((v) => {
          if (v.id === id) {
            conn.image = v.image;
            conn.status = v.status;
          }
        });
      }
    },
    getMouseXY(e) {
      this.closeMenu();
      let x, y, a, b;
      // console.log(this.xTotal, this.yTotal);
      a = parseInt(e.offsetX / (this.miniMapW / 100));
      b = parseInt(e.offsetY / (this.miniMapH / 100));
      x = (this.xTotal / 100) * a;
      y = (this.yTotal / 100) * b;
      // console.log(parseInt(x), parseInt(y));
      this.webRtc.sendToGdevelop("hopTo", {
        x: parseInt(x),
        y: parseInt(y),
      });
    },
    changeSetting() {
      this.menuIndex = -1;
      this.showMenu = false;
      this.showChangeRole = true;
      this.roleName = this.nearBylist[0] ? this.nearBylist[0].nickname : "";
      this.role.id = this.nearBylist[0] ? this.nearBylist[0].image : 1;
      this.isSettingStatus = true;
    },
    async currentLocation(mapid, x, y, xTotal, yTotal) {
      // console.log(mapid, x, y, xTotal, yTotal);
      this.mapId = mapid;
      this.helpPos = { mapid: mapid, x: x, y: y };
      // this.liveRoom = this.mapId===103 ? 103 : mapid;
      if (this.mapId === 103) {
        this.liveRoom = 103;
      }
      if (this.mapId !== 202 && this.mapId !== 105) {
        if (window.location.href.indexOf("meeting") != -1) {
          let url = window.location.href.replace(/(\?|#)[^'"]*/, "");
          window.history.pushState({}, 0, url);
        }
      }
      if ((this.mapId === 201 || this.mapId === 203) && !this.isOfficeSpace) {
        if (this.officeSpaceAddress.toLowerCase() === this.account) {
          this.inviteIcon = true;
          if (this.officeSpaceType === 1) {
            this.inviteLink = this.locationUrl + "/?office=" + this.account;
          } else {
            this.inviteLink = this.locationUrl + "/?toffice=" + this.account;
          }
        } else {
          this.inviteIcon = false;
        }
        this.isOfficeSpace = true;
      }
      if (this.mapId == 103 || this.mapId == 202) return;
      this.xTotal = xTotal;
      this.yTotal = yTotal;
      let left, top, leftpx, toppx;
      if (mapid === 101) {
        left = parseInt(x / (xTotal / 100)) - 10;
        top = parseInt(y / (yTotal / 100)) - 10;
      } else {
        left = parseInt(x / (xTotal / 100)) - 20;
        top = parseInt(y / (yTotal / 100)) - 25;
      }
      leftpx = (this.miniMapW / 100) * left;
      toppx = (this.miniMapH / 100) * top;
      if (this.$refs.mapLocation !== undefined) {
        this.$refs.mapLocation.style.transform = `translate(${leftpx}px,${toppx}px)`;
      }
      this.setGamefocus();
    },
    settingBack() {
      if (this.isSettingStatus) {
        this.showChangeRole = false;
        this.setGamefocus();
      }
    },
    cancelBubble(event) {
      var e = window.event || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },

    testMedia() {
      this.webRtc.shareScreenStream();
      this.setGamefocus();
    },
    openVideoWrapper(index) {
      if (this.liveHouse || this.mapId == 105 || this.mapId == 202) {
        this.showVideo = true;
        this.activeVideo = index;
        this.closeMenu();
      }
    },

    getunreadMessage() {
      let messageCount = 0;
      if (this.nearBylist.length !== 0 && this.menuIndex !== 0) {
        this.vueAllTalkMsg.forEach((v) => {
          if (v.sender !== this.nearBylist[0].id && !v.read && v.target === 1) {
            messageCount = messageCount + 1;
          }
        });
        // this.vueTeamMsg.forEach((v) => {
        //   if (v.sender !== this.nearBylist[0].id && !v.read) {
        //     messageCount = messageCount + 1;
        //   }
        // });
      }
      return messageCount === 0 ? false : true;
    },

    sortData(a, b) {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    },

    getMembersUnreadNum() {
      if (this.vueAllTalkMsg != null && this.vueAllTalkMsg != []) {
        let count = 0;
        this.vueTalkMsg.forEach((v) => {
          if (v.sender !== this.nearBylist[0].id && !v.read && v.target === 1) {
            count = count + 1;
          }
        });
        this.membersList.forEach((v, i) => {
          let userList = this.vueTalkMsg.filter(
              (val) => val.sender === v.id && val.target !== 1
          );
          let userCount = 0;
          userList.forEach((v) => {
            if (v.sender !== this.nearBylist[0].id && !v.read) {
              userCount = userCount + 1;
            }
          });
          this.membersList[i].unreadNum = userCount;
        });
        this.membersList.unreadNum = count;
      }
      this.everyOneList = this.nearBylist.concat(this.membersList);

      if (this.teamList != null && this.teamList != []) {
        this.teamList.forEach((v, i) => {
          let userList2 = this.vueTalkMsg.filter(
              (val) => val.sender === v.id && val.target !== 1
          );
          let userCount2 = 0;
          userList2.forEach((v) => {
            if (v.sender !== this.nearBylist[0].id && !v.read) {
              userCount2 = userCount2 + 1;
            }
          });
          this.teamList[i].unreadNum = userCount2;
        });
      }
    },
    getNearByUnreadNum() {
      if (this.vueNearByMsg != null && this.vueNearByMsg != []) {
        let count = 0;
        this.vueNearByMsg.forEach((v) => {
          if (v.sender.id !== this.nearBylist[0].id && !v.read) {
            count = count + 1;
          }
        });

        this.nearBylist.forEach((v, i) => {
          let userList = this.vueTalkMsg.filter(
              (val) => val.sender === v.id && val.target !== 1
          );
          let userCount = 0;
          userList.forEach((v) => {
            if (v.sender !== this.nearBylist[0].id && !v.read) {
              userCount = userCount + 1;
            }
          });
          this.nearBylist[i].unreadNum = userCount;
        });
        this.nearBylist.forEach((item, index) => {
          let has = this.followList.filter((val) => val.id === item.id);
          if (has.length > 0) this.nearBylist[index].followed = true;
        });
        this.teamList.forEach((item, index) => {
          let has = this.followList.filter((val) => val.id === item.id);
          if (has.length > 0) {
            this.teamList[index].followed = true;
          } else {
            this.teamList[index].followed = false;
          }
        });

        this.nearBylist.unreadNum = count;

        // console.log('this.nearBylist', this.nearBylist)
      }
      this.everyOneList = this.nearBylist.concat(this.membersList);
    },
    changeStatus(status) {
      this.workStatus = status;
      this.showUserInfo = false;
      this.webRtc.sendToGdevelop("workStatus", status);
    },

    showMenuIndex(menuIndex) {
      this.showCustomized = false;
      if (this.menuIndex === 0) {
        if (this.sendObject === "Everyone") {
          this.$store.commit("addReadStatus", "Everyone");
        } else if (this.sendObject === "Nearby") {
          this.$store.commit("addReadStatus", "Nearby");
        } else if (this.sendObject === "Team") {
          this.$store.commit("addReadTeamStatus", "Team");
          setTimeout(() => {
            this.getTeamListUnread();
          }, 2000);
        } else {
          this.$store.commit("addReadStatus", this.sendUser);
        }
      }
      if (menuIndex === this.menuIndex) {
        this.showMenu = false;
        this.menuIndex = -1;
        this.setGamefocus();
      } else {
        this.showMenu = true;
        this.menuIndex = menuIndex;
        if (menuIndex === 0) {
          if (this.sendObject === "Everyone") {
            this.$store.commit("addReadStatus", "Everyone");
          } else if (this.sendObject === "Nearby") {
            this.$store.commit("addReadStatus", "Nearby");
          } else if (this.sendObject === "Team") {
            this.$store.commit("addReadTeamStatus", "Team");
            setTimeout(() => {
              this.getTeamListUnread();
            }, 2000);
          } else {
            this.$store.commit("addReadStatus", this.sendUser);
          }
        }
      }
    },

    async triggerTrack(track, status) {
      this.webRtc.triggerTrack(track, status);
      if (status == true) {
        await this.webRtc.openMedia(track);
      } else {
        await this.webRtc.closeMedia(track);
      }
      let arr = [];
      for (let i = 0; i < this.webRtc.conns.length; i++) {
        arr.push(this.webRtc.conns[i].targetID);
      }
      if (track == 0) {
        this.webRtc.sendToGdevelop("audioStatus", {
          targetID: arr,
          status: status,
        });
        this.openAudio = status;
        // console.log(this.openAudio ? 1 : 4);
        this.webRtc.sendToGdevelop("showSpeaking", {
          status: this.openAudio ? 1 : 4,
        });
      } else {
        this.webRtc.sendToGdevelop("videoStatus", {
          targetID: arr,
          status: status,
        });
        this.openVideo = status;
      }
    },
    async createOffer(targetID) {
      await this.webRtc.createOffer(targetID);
      // await this.webRtc.createOffer(targetID);
    },
    async closePeer(targetID) {
      await this.webRtc.closePeer(targetID);
    },
    async initWebRTC() {
      // const that = this
      setTimeout(() => {
        // console.log(this.account,this.isConnectTip,this.showExploreMap)
        if (!this.account && !this.isConnectTip && !this.showExploreMap) {
          //Please manually connect your wallet.
          this.alert = "Please manually connect your wallet.";
          this.topTips({ alert: this.alert, time: 5000 });
        }
      }, 10000);

      this.webRtc = new MyWebRTC();
      await this.webRtc.init(this.$refs.games.contentWindow.xl);

      this.openAudio = this.webRtc.openAudio;
      this.openVideo = this.webRtc.openVideo;
      // console.log(this.openAudio ? 1 : 4);
      // this.webRtc.sendToGdevelop("showSpeaking", {
      //   status: this.openAudio ? 1 : 4,
      // });
      // console.log("", this.openAudio, this.openVideo);
      this.isInitWebRTC = true;
      if (this.account) {
        if (localStorage.getItem("userAddress") != this.account) {
          this.showChangeRole = true;
          this.roleName = this.nearBylist[0] ? this.nearBylist[0].nickname : "";
          this.role.id = this.nearBylist[0] ? this.nearBylist[0].image : 1;
        } else {
          this.webRtc.sendToGdevelop("setAccount", {
            address: this.account,
            role: this.role.nftname != "" ? 1 : this.role.id,
            name: this.role.name,
            nftname: this.role.nftname,
            nftid: this.role.nftname != "" ? this.role.nftid : 0,
          });
        }
      }
      // console.log(this.$refs.games.contentWindow);
    },
    snapshot() {
      let canvas = this.$refs.localVideo;
      canvas.width = 400;
      canvas.height = 300;
      canvas
          .getContext("2d")
          .drawImage(this.myVideo, 0, 0, canvas.width, canvas.height);
    },
    async connect() {
      const that = this;
      that.isConnectTip = false;
      if (window.ethereum) {
        // cyberconnect
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x38",
                    chainName: "BSC smartchain",
                    rpcUrls: ["https://bsc-dataseed.binance.org"],
                    nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB", // 2-6 characters long
                      decimals: 18,
                    },
                  },
                ],
              });
            } catch (addError) {
              // handle "add" error
            }
          }
          // handle other "switch" errors
        }

        //Scroll
        /** try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x82751" }],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x82751",
                    chainName: "Scroll Alpha Testnet",
                    rpcUrls: ["https://alpha-rpc.scroll.io/l2"],
                    nativeCurrency: {
                      name: "ETH",
                      symbol: "ETH", // 2-6 characters long
                      decimals: 18,
                    },
                  },
                ],
              });
            } catch (addError) {
              // handle "add" error
            }
          }
        } */
        await window.ethereum
            .request({
              method: "eth_requestAccounts",
            })
            .then(async (res) => {
              this.account = res[0].toLowerCase();
              that.isConnectTip = false;
              localStorage.setItem("useWallet", true);
              //create ccprofile TODO
              this.verifyProfile();
              //create Scroll profile TODO
              //this.verifyScrollProfile();
              if (this.isInitWebRTC) {
                if (localStorage.getItem("userAddress") != this.account) {
                  this.showChangeRole = true;
                } else {
                  this.webRtc.sendToGdevelop("setAccount", {
                    address: this.account,
                    role: this.role.nftname != "" ? 1 : this.role.id,
                    name: this.role.name,
                    nftname: this.role.nftname,
                    nftid: this.role.nftname != "" ? this.role.nftid : 0,
                  });
                }
              }
            })
            .catch((error) => {
              if (error.code === 4001) {
                that.alert = "Please connect to Ethereum.";
                this.topTips({ alert: that.alert, time: 3000 });
              } else {
                console.error(error);
              }
            });

        window.ethereum.on("accountsChanged", async (accounts) => {
          if (accounts.length > 0) {
            this.account = accounts[0].toLowerCase();
            // this.$store.commit("setRole", false);
            location.reload();
          }
        });
      } else {
        this.isConnectTip = true;
      }
    },

    async disconnectMetaMask() {
      localStorage.setItem("useWallet", false);
      this.account = "";
      location.reload();
    },

    async verifyScrollProfile() {
      let result = await ScrollContract.methods
          .profileCreated(this.account)
          .call();
      if (result == 0) {
        this.showScrollProfile = true;
      }
    },

    async createScrollProfile() {
      this.showScrollProfile = false;
      let result = await ScrollContract.methods
          .createProfile(this.handle)
          .send({
            from: this.account,
          });
      console.log("result", result);
      if (result.status == true) {
        this.alert = "success.";
        this.topTips({ alert: this.alert, time: 3000 });
      }
    },

    async verifyProfile() {
      let result = await W3Contract.methods.balanceOf(this.account).call();
      // console.log("111111111111111111",result);
      if (result == 0) {
        this.showccProfile = true;
      }
    },

    async createProfile() {
      if (this.handle.length < 12 || this.handle.length > 20) {
        this.alert = "Please enter handle(12-20 letters).";
        this.topTips({ alert: this.alert, time: 3000 });
        return;
      }
      let handleResult = await W3Contract.methods
          .getProfileIdByHandle(this.handle)
          .call();
      if (handleResult == 0) {
        this.showccProfile = false;
        //0x8e0ed8482d7374380cf548317a9d78288651c456
        let result = await W3Contract.methods
            .createProfile(
                [
                  this.account,
                  this.handle,
                  "w3Space",
                  "",
                  "0x8e0ed8482d7374380cf548317a9d78288651c456",
                ],
                "0x",
                "0x"
            )
            .send({
              from: this.account,
            });
        // debugger;
        // console.log(result);
        if (result.status == true) {
          this.alert = "success.";
          this.topTips({ alert: this.alert, time: 3000 });
        }
      } else {
        this.alert = "The handle is already existed.";
        this.topTips({ alert: this.alert, time: 3000 });
      }
    },
    mouseUserOver() {
      this.showUserInfo = true;
      // this.closeMenu();
    },
    mouseUserLeave() {
      this.showUserInfo = false;
    },
  },
  watch: {
    account() {
      if (this.account) this.isConnectTip = false;
    },
    openVideo() {
      if (this.openVideo == true) {
        $(".selfVideoLoading").css("opacity", "1").css("z-index", "2");
        setTimeout(() => {
          $(".selfVideoLoading").css("opacity", "0").css("z-index", "0");
          $("#localVideo").css("opacity", "1");
        }, 2000);
      } else {
        $(".selfVideoLoading").css("opacity", "1").css("z-index", "2");
        $("#localVideo").css("opacity", "0");
        setTimeout(() => {
          $(".selfVideoLoading").css("opacity", "0").css("z-index", "0");
        }, 1000);
      }
    },
    openLiveVideo() {
      if (this.openVideo == true) {
        $(".selfVideoLoading").css("opacity", "1");
        $(".selfAvatar").css("z-index", "1");
        setTimeout(() => {
          $(".selfVideoLoading").css("opacity", "0");
          $("#localVideo").css("opacity", "1");
        }, 2000);
      } else {
        $(".selfVideoLoading").css("opacity", "1");
        $("#localVideo").css("opacity", "0");
        $(".selfAvatar").css("z-index", "0");
        setTimeout(() => {
          $(".selfVideoLoading").css("opacity", "0");
        }, 1000);
      }
    },
    openScreen() {
      if (this.openScreen == true) {
        $(".selfScreenLoading").css("opacity", "1");
        setTimeout(() => {
          $(".selfScreenLoading").css("opacity", "0");
          $("#localScreenSelf").css("opacity", "1");
        }, 2000);
      } else {
        $(".selfScreenLoading").css("opacity", "1");
        $("#localScreenSelf").css("opacity", "0");
        setTimeout(() => {
          $(".selfScreenLoading").css("opacity", "0");
        }, 1000);
      }
    },
    async liveVideos() {
      // console.log("liveVideos", this.liveVideos);
      if ((this.liveVideos.length > 0 || this.roomUsers) && !this.leave) {
        for (var i = 0; i < this.roomUsers.length; i++) {
          if (this.roomUsers[i] === this.liveVideos[0].uid && i !== 0) {
            let newList = this.roomUsers;
            newList.unshift(newList[i]);
            newList.splice(i + 1, 1);
            this.roomUsers = newList;
          }

          var arrindex = this.liveVideos.findIndex((item) => {
            return item.uid === this.roomUsers[i];
          });
          if (arrindex == -1) {
            let uid = (this.roomUsers[i] % 100000) + 1010000000;
            let userList;
            if (this.mapId == 105 || this.mapId == 202) {
              userList = this.currentLive.concat(this.nearBylist);
            } else {
              userList = this.membersList.concat(this.nearBylist);
            }
            let status, image, sponsor;
            for (let k = 0; k < userList.length; k++) {
              if (userList[k].id == uid) {
                status = userList[k].status;
                image = userList[k].image;
                sponsor = userList[k].sponsor;
              }
            }
            let user = {
              hasAudioTrack: false,
              image: image,
              loadingStatus: undefined,
              speakingLevel: 0,
              status: status ? status : 0,
              uid: this.roomUsers[i],
              sponsor: sponsor,
            };
            this.liveVideos.push(user);
          } else {
            for (var j = 0; j < this.liveVideos.length; j++) {
              var arrindex1 = this.roomUsers.findIndex((item) => {
                return item === this.liveVideos[j].uid;
              });
              if (arrindex1 == -1) {
                this.liveVideos[j].hidden = true;
              } else {
                this.liveVideos[j].hidden = false;
              }
            }
          }
        }

        for (let i = 0; i < this.liveVideos.length; i++) {
          if (
              this.liveVideos[i].hasVideoTrack === true &&
              !this.liveVideos[i].loadingStatus
          ) {
            $(".remoteVideoLoading" + this.liveVideos[i].uid).css(
                "z-index",
                "1"
            );
            setTimeout(() => {
              $(".remoteVideoLoading" + this.liveVideos[i].uid).css(
                  "z-index",
                  "-1"
              );
            }, 2000);
          }
          this.liveVideos[i].loadingStatus = this.liveVideos[i].hasVideoTrack;
        }
      }

      if (!this.showLiveChat) {
        setTimeout(() => {
          let scrollWidth = this.$refs.remoteScroll.scrollWidth;
          this.$refs.remoteScroll.scrollTo(scrollWidth, 0, { axis: "x" });
        }, 200);
      }
    },

    vueConns: function () {
      this.listNum = this.vueConns.length;
      // console.log("vueConns", this.vueConns);
      if (this.listNum > 0) {
        if (window.devicePixelRatio <= 1) {
          document
              .querySelector(".home")
              .style.setProperty("--localAreaTop", "25px");
        } else {
          document
              .querySelector(".home")
              .style.setProperty("--localAreaTop", "12px");
        }

        for (let i = 0; i < this.vueConns.length; i++) {
          if (
              this.vueConns[i].videoStatus === true &&
              !this.vueConns[i].loadingStatus
          ) {
            $(".remoteVideoLoading" + this.vueConns[i].targetID).css(
                "z-index",
                "1"
            );
            setTimeout(() => {
              $(".remoteVideoLoading" + this.vueConns[i].targetID).css(
                  "z-index",
                  "-1"
              );
            }, 2000);
          }

          if (
              this.vueConns[i].screenStatus === true &&
              !this.vueConns[i].loadingScreenStatus
          ) {
            $(".remoteScreenLoading" + this.vueConns[i].targetID).css(
                "z-index",
                "1"
            );
            setTimeout(() => {
              $(".remoteScreenLoading" + this.vueConns[i].targetID).css(
                  "z-index",
                  "-1"
              );
            }, 2000);
          }
          this.vueConns[i].loadingStatus = this.vueConns[i].videoStatus;
          this.vueConns[i].loadingScreenStatus = this.vueConns[i].screenStatus;
        }
      } else {
        if (window.devicePixelRatio <= 1) {
          document
              .querySelector(".home")
              .style.setProperty("--localAreaTop", "30px");
        } else {
          document
              .querySelector(".home")
              .style.setProperty("--localAreaTop", "20px");
        }
      }

      setTimeout(() => {
        let scrollWidth = this.$refs.remoteScroll.scrollWidth;
        this.$refs.remoteScroll.scrollTo(scrollWidth, 0, { axis: "x" });
      }, 200);
    },
    vueNearByMsg: function () {
      this.$nextTick(() => {
        setTimeout(() => {
          var container = this.$el.querySelector("#sengMsg");
          container.scrollTop = container.scrollHeight;
        }, 100);
      });
    },
    vueTalkMsg: function () {
      this.$nextTick(() => {
        setTimeout(() => {
          var container = this.$el.querySelector("#sengMsg");
          container.scrollTop = container.scrollHeight;
        }, 100);
      });
    },
    vueAllTalkMsg: function () {
      if (this.vueAllTalkMsg.length > this.allTalkLength) {
        if (this.menuIndex !== 0) {
          this.$refs.audio.currentTime = 0;
          this.$refs.audio.play();
        }
      }
      this.allTalkLength = this.vueAllTalkMsg.length;
    },
  },
  destroyed() {
    // this.$store.commit("setInfoList",JSON.stringify([]));
  },
  directives: {
    drag(el) {
      el.onmousedown = function (e) {
        var disx = e.pageX - el.offsetLeft;
        var disy = e.pageY - el.offsetTop;
        document.onmousemove = function (e) {
          el.style.left = e.pageX - disx + "px";
          el.style.top = e.pageY - disy + "px";
          $("#board")
              .css("left", e.pageX - disx + "px")
              .css("top", e.pageY - disy + 32 + "px");
        };
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
        };
      };
    },
  },
};
</script>
<style lang="stylus" scoped>
@import 'home.styl'
/deep/ .filePrew
  opacity 0
  width 200px
  height 200px
  position absolute
  margin-left -200px
  cursor pointer
.addLogo
  width 100px
  height 200px
  position relative
  margin-left -150px
.meetingfilePrew
  width 200px
  height 200px
  position relative
  margin-left -200px
  top -180px
</style>
