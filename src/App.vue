<template>
  <div>
    <div id="app">
      <img
        id="pingLogo"
        alt="Ping logo"
        src="./assets/pingLogo.png"
      >
    </div>
    <div id="spinnerCSS">
      <b-spinner
        v-if="spinner"
        style="width: 3rem; height: 3rem;"
        label="Large Spinner"
        type="grow"
      />
    </div>
    <div
      id="tapMe"
      :class="{ tapMeClass: isActive }"
    >
      <b-button
        squared
        variant="outline-danger"
        @click="buttonState == 'stop' ? makePing('start') : makePing('stop')"
      >
        <!-- @click="makePing('start')" -->
        <!-- here start the button -->
        Ping Dota
      </b-button>
      <!-- v-if="resolvedPing !== 0" -->
      <span id="pingText">
        <!-- here is the text -->
        {{ resolvedPing.toFixed(2) }}
      </span>
    </div>
  </div>
</template>

<script>
import pingjs from 'web-pingjs';
import networkService from './helpers/networkService';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      isActive: false,
      spinner: true,
      pingValue: 0,
      buttonState: 'stop',
      resolvedPing: 0,
    };
  },
  created() {
    this.make3sdelay();
  },
  methods: {
    make3sdelay() {
      setTimeout(() => {
        this.spinner = false;
      }, 2800);
    },
    makePing(value) {
      if (value === 'start') {
        this.isActive = true;
        this.startPing = setInterval(this.pingWithPingjs, 1000);
        console.log('Button Pressed');
        this.buttonState = 'start';
      } else if (value === 'stop') {
        this.isActive = false;
        console.log('Button Pressed');
        this.buttonState = 'stop';
        clearInterval(this.startPing);
        this.resolvedPing = 0;
      }
    },
    ping() {
      // did not used it
      const self = this;
      const firstProb = new Date();
      networkService
        .get('http://103.28.54.16')
        .then((resource) => {
          console.log(resource);
          const secondProb = new Date();
          self.pingValue = secondProb - firstProb;
          console.log('From Resource: ', self.pingValue);
        })
        .catch((e) => {
          console.log(e);
          const secondProb = new Date();
          self.pingValue = secondProb - firstProb;
          console.log('From Error: ', self.pingValue);
        });
    },
    pingWithFetch() {
      const self = this;
      const firstProb = new Date();
      fetch('https://playbattlegrounds.com/', {
        mode: 'no-cors' /* type: 'HEAD' */,
      })
        .then((resource) => {
          console.log(resource);
          const secondProb = new Date();
          self.pingValue = secondProb - firstProb;
          console.log('From Resource: ', self.pingValue);
        })
        .catch((e) => {
          console.log(e);
          const secondProb = new Date();
          self.pingValue = secondProb - firstProb;
          console.log('From Error: ', self.pingValue);
        });
    },
    pingWithPingjs() {
      const self = this;
      const firstProb = new Date();
      // sgp-1.valve.net dont have any open port
      // so I took a side service which has a ip just near
      // the sea server, and it's pretty much accurate
      pingjs('https://replay111.valve.net', 0.3)
        .then((resource) => {
          self.resolvedPing = resource;
          console.log(resource);
          const secondProb = new Date();
          self.pingValue = secondProb - firstProb;
          console.log('From Resource: ', self.pingValue);
        })
        .catch((error) => {
          console.log(error);
          const secondProb = new Date();
          self.pingValue = secondProb - firstProb;
          console.log('From Error: ', self.pingValue);
        });
    },
  },
};
</script>

<style></style>
