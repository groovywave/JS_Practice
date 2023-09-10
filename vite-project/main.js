import './style.scss'
import './test.scss'
//splide
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import '@splidejs/splide/css/skyblue';
import '@splidejs/splide/css/sea-green';
import '@splidejs/splide/css/core';

new Splide( '.splide' ,{
  type:"loop",
}).mount();
