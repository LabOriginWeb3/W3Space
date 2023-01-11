<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
p {
  margin: 0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

::-webkit-scrollbar {
  width: 4px !important;
  height: 6px !important;
}

::-webkit-scrollbar-track {
  background: #ffffff00;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(
      132deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.3) 100%
  );
}

.bb-feedback-button-icon {
  background-color: #485bff99 !important;
}

.bb-feedback-button-icon:hover {
  background-color: #485bff !important;
}
.bb-feedback-button--open .bb-feedback-button-icon {
  display: flex;
  background-color: #485bff !important;
}
/* ::selection {
  background: none !important;
} */

#emoji-container > #emoji-popup > #emoji-popover-header::-webkit-scrollbar{
  height: 4px !important;
}

#emoji-container > #emoji-popup > #emoji-popover-header > .emoji-tab.active{
  border-bottom: 3px solid #b3b3b3 !important;
}
#emoji-container > #emoji-popup > #emoji-popover-header > .emoji-tab:hover{
  border-bottom: 3px solid #b3b3b3 !important;
}

@font-face {
  font-family: "Silkscreen";
  src: url("./assets/font/Silkscreen-Regular.ttf");
}
@font-face {
  font-family: "Silkscreen_bold";
  src: url("./assets/font/Silkscreen-Bold.ttf");
}
@font-face {
  font-family: "Noto Sans";
  src: url("./assets/font/NotoSans-Medium.ttf");
  font-style: normal;
}
@font-face {
  font-family: "Noto Sans bold";
  src: url("./assets/font/NotoSans-Bold.ttf");
  font-style: normal;
}

.officeCon{
  user-select: text;
}
</style>
