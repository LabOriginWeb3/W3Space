git <template>
  <div
    class="company officeBg"
    @click="closeMeetingTip()"
  >
    <div @click="cancelBubble($event)">
      <div class="officeCon">
        <p
          class="close_frame"
          @click="closeMeetingTip()"
        >
         <img src="../assets/close.svg"/>
        </p>
        <div class="bgImg">
          <img class="left" src="../assets/bg-left.png" />
        </div>
        <h2>PICK AN MEETING TO ENTER</h2>
        <div class="type">
          <p
            :class="{ choosed: showMeetingType == 1 }"
            @click="showMeetingType = 1"
          >
            Ongoing
          </p>
          <p
            :class="{ choosed: showMeetingType == 2 }"
            @click="showMeetingType = 2"
          >
            Upcoming
          </p>
          <p
            :class="{ choosed: showMeetingType == 3 }"
            @click="showMeetingType = 3"
          >
            History
          </p>
        </div>
        <div class="info">
          <div
            class="officeList"
            :style="
              choosedMeetingList.length <= 1 ? 'justify-content: center;' : ''
            "
          >
            <div v-for="(item, index) in choosedMeetingList" :key="index">
              <div
                :class="{ item: true, active: meetingName === item.name }"
                @click="setMeetingName(item.name)"
              >
                <img v-if="item.logo === ''" src="../assets/home.png" />
                <img v-else :src="locationUrl + '/meeting/icon/' + item.logo" />
                <p>
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
          <div class="enterButton" @click="joinMeeting(meetingName)">
            <div class="text">ENTER</div>
          </div>
        </div>
        <div class="bgImg bgImg_right">
          <img class="right" src="../assets/taskright.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MeetingList",
  data() {
    return {
        meetingList: { valid: [] },
        showMeetingType: 1,
    };
  },
  props: ['meetingName','locationUrl'],
  computed: {
     choosedMeetingList() {
      switch (this.showMeetingType) {
        case 1:
          return this.meetingList.valid;
        case 2:
          return this.meetingList.income;
        case 3:
          return this.meetingList.end;
        default:
          return this.meetingList.valid;
      }
    },
  },
  created() {
    window["meetinglist"] = async (arr) => {
      this.getMeetinglist(arr.ary);
    };
  },
  methods: {
    closeMeetingTip(){
        this.$emit("closeMeetingTip");
    },
    getMeetinglist(ary) {
      let meetingList = { income: [], end: [], valid: [] };
      let time = new Date().getTime();
      ary.forEach((item) => {
        if (time > item.endtime) {
          meetingList.end.push(item);
        } else if (time < item.begintime) {
          meetingList.income.push(item);
        } else {
          meetingList.valid.push(item);
        }
      });
      this.meetingList = meetingList;
      this.$emit("openMeetingTip");
    },
    setMeetingName(e) {
      this.$store.commit("setMeetingName", e);
    },
    joinMeeting(e) {
      window.open(this.locationUrl + "?meeting=" + e, "_self");
    },
    cancelBubble(event) {
      var e = window.event || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },
  },
  watch: {},
};
</script>

<style lang="stylus" scoped>
@import '../views/home.styl'
</style>