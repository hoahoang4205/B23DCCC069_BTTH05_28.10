import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export interface LocationResult {
  latitude: number;
  longitude: number;
}

export class LocationError extends Error {
  code: 'DENIED' | 'NEVER_ASK_AGAIN' | 'UNAVAILABLE' | 'TIMEOUT' | 'UNKNOWN';

  constructor(
    code: 'DENIED' | 'NEVER_ASK_AGAIN' | 'UNAVAILABLE' | 'TIMEOUT' | 'UNKNOWN',
    message: string
  ) {
    super(message);
    this.code = code;
  }
}

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const checkGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (checkGranted) {
        return true;
      }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Quyền truy cập vị trí',
          message: 'Ứng dụng cần quyền vị trí để bạn chia sẻ chỗ đang đứng với bạn bè.',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Hủy',
          buttonPositive: 'Đồng ý',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        throw new LocationError(
          'NEVER_ASK_AGAIN',
          'Hãy bật quyền vị trí trong Cài đặt của máy để dùng tính năng này.'
        );
      } else {
        throw new LocationError(
          'DENIED',
          'Bạn cần cấp quyền vị trí để gửi vị trí của mình.'
        );
      }
    } catch (err) {
      if (err instanceof LocationError) throw err;
      throw new LocationError('UNKNOWN', 'Không thể yêu cầu quyền vị trí.');
    }
  } else if (Platform.OS === 'ios') {
    return new Promise((resolve, reject) => {
      Geolocation.requestAuthorization(
        () => resolve(true),
        (error) => {
          if (error.code === 1) {
            reject(
              new LocationError(
                'DENIED',
                'Bạn cần cấp quyền vị trí để gửi vị trí của mình.'
              )
            );
          } else {
            reject(new LocationError('UNKNOWN', error.message));
          }
        }
      );
    });
  }

  return true;
};

export const getCurrentLocation = async (): Promise<LocationResult> => {
  await requestLocationPermission();

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            reject(
              new LocationError(
                'DENIED',
                'Bạn cần cấp quyền vị trí để gửi vị trí của mình.'
              )
            );
            break;
          case 2: // POSITION_UNAVAILABLE
            reject(
              new LocationError(
                'UNAVAILABLE',
                'Không xác định được vị trí. Hãy bật GPS rồi thử lại.'
              )
            );
            break;
          case 3: // TIMEOUT
            reject(
              new LocationError(
                'TIMEOUT',
                'Lấy vị trí quá lâu. Hãy ra nơi thoáng hơn và thử lại.'
              )
            );
            break;
          default:
            reject(
              new LocationError(
                'UNKNOWN',
                error.message || 'Lỗi không xác định khi lấy vị trí.'
              )
            );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};
