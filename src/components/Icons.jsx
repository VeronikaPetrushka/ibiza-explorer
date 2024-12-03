import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case 'check':
        imageSource = require('../assets/icons/check.png');
        break;
    case 'close':
        imageSource = require('../assets/icons/close.png');
        iconStyle.push(styles.purple);
        break;
    case 'back':
        imageSource = require('../assets/icons/back.png');
        break;
    case 'image':
        imageSource = require('../assets/icons/image.png');
        iconStyle.push(styles.purple);
        break;
    case 'settings':
        imageSource = require('../assets/icons/settings.png');
        iconStyle.push(styles.purple);
        break;
    case 'tutorial':
        imageSource = require('../assets/icons/tutorial.png');
        iconStyle.push(styles.purple);
        break;
    case 'visited':
        imageSource = require('../assets/icons/visited.png');
        break;
    case 'achievements':
        imageSource = require('../assets/icons/achievements.png');
        break;
    case 'route':
        imageSource = require('../assets/icons/route.png');
        break;
    case 'places':
        imageSource = require('../assets/icons/places.png');
        break;
    case 'album':
        imageSource = require('../assets/icons/album.png');
        break;
    case 'checkin-btn':
        imageSource = require('../assets/icons/checkin-btn.png');
        break;
    case 'music':
        imageSource = require('../assets/icons/music.png');
        break;
    case 'upload':
        imageSource = require('../assets/icons/upload.png');
        iconStyle.push(styles.purpleLight);
        break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  purple: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#4f1c86'
  },
  purpleLight: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#a86ee9'
  }
});

export default Icons;
