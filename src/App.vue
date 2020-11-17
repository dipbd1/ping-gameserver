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
      <h2
        id="pingText"
      >
        <!-- here is the text -->
        {{ resolvedPing.toFixed(2) }}
      </h2>
    </div>
  </div>
</template>

<script>
import { ping } from '@network-utils/tcp-ping';
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
      fetch('https://playbattlegrounds.com/', { mode: 'no-cors' /* type: 'HEAD' */ })
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
    // pingWithNpmModule() {
    //   ping(
    //     {
    //       // The IP address or hostname of the host you want
    //       // to ping. Defaults to 127.0.0.1 (localhost)
    //       address: 'sgp-1.valve.net',
    //       // How many times do you want want to
    //       // attempt to reach the host? Default is 10
    //       attempts: 10,
    //       // What port do you want to connect on?
    //       // Default is 80
    //       port: 80,
    //       // How long do you want to wait (in milliseconds)
    //       // before assuming an attempt has failed?
    //       // Default is 3000 (3 seconds)
    //       timeout: 3000,
    //     },
    //     this.update,
    //   ).then((result) => {
    //     console.log('ping result:', result);
    //   });
    // },
    // update(progress, total) {
    //   console.log(progress, '/', total);
    // },
  },
};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 1px;
	}
	#pingLogo {
		width: 400px;
		height: 400px;
	}
	#spinnerCSS {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 1px;
	}
	/* #tapme h2 {
		width: 0 !important;
		transition: all ease 0.5s;
	}
	#tapme.tapMeClass h2 {
		width: auto;
	} */
	#tapMe {
		text-align: center;
		color: #2c3e50;
		margin-top: 10px;
	}
	#pingText {
		height: 50px;
		width: 0px;
		margin-right: 20px;
		margin-left: 20px;
		display: inline-table;
		justify-content: initial;
    transition: all ease 0.5s;
	}
	.tapMeClass #pingText {
		width: 50px;
	}
</style>
