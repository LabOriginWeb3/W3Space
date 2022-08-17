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
  width: 4px;
  height: 8px;
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
</style>
