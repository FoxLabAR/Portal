<template>
    <div class="card">
      <div class="header">
        <h2 class="name">{{ name }}</h2>
        <p class="info">{{ profession }} / {{ role }} / {{ gender }}</p>
      </div>
      <div class="stats">
        <div class="stat life">
          <span class="label">LIFE</span>
          <span class="value">{{ life }}</span>
        </div>
        <div class="stat psyche">
          <span class="label">PSYCHE</span>
          <span class="value">{{ psyche }}</span>
        </div>
        <div class="gmp">
          <span class="label">GMP+</span>
          <span class="value">{{ gmp }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "StatCard",
    props: {
      name: {
        type: String,
        default: "MUSTANG",
      },
      profession: {
        type: String,
        default: "Engineer",
      },
      role: {
        type: String,
        default: "Military Soldier",
      },
      gender: {
        type: String,
        default: "Male",
      },
      life: {
        type: Number,
        default: 1200,
      },
      psyche: {
        type: Number,
        default: 1212,
      },
      gmp: {
        type: Number,
        default: 1480,
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    padding: 20px;
    border-radius: 10px;
    width: 250px;
    font-family: Arial, sans-serif;
  }
  
  .header {
    margin-bottom: 10px;
  }
  
  .name {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }
  
  .info {
    font-size: 14px;
    color: #555;
  }
  
  .stats {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  .stat {
    text-align: left;
  }
  
  .stat .label {
    color: #ff0000;
    font-weight: bold;
    display: block;
    font-size: 12px;
  }
  
  .stat .value {
    font-size: 16px;
    font-weight: bold;
  }
  
  .life, .psyche {
    width: 45%;
  }
  
  .gmp {
    text-align: right;
  }
  
  .gmp .label {
    color: #ffffff;
    background-color: #333;
    padding: 5px;
    border-radius: 5px;
    display: inline-block;
  }
  
  .gmp .value {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-left: 10px;
  }
  </style>
  