import { Injectable } from '@angular/core';
//Observable是RxJS中的一個類，它代表一個可觀察的數據源。
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor() {}

  //同步方法//
  getData() {
    return '調用成功';
  }
  getData2() {
    return '調用成功';
  }

  //非同步方法//

  //這裡會返回undefined，因為沒有回調函數
  getCallbackData1() {
    //1

    //2定時器
    setTimeout(() => {
      //4
      let name = 'callback data';
      //當主程式執行到 return name 時，整個函數還未執行完成，繼續往下，所以最後返回undefined
      return name;
    }, 1000);
    //3，通常運行到這裡（下方括號處）沒有返回值後就回停止運行
    //一般來說這裡會先執行，因為setTimeout是非同步的：然後如果沒有回調函數，這裡會返回undefined
  }

  //這裡會返回'有回調：有值'，因為有回調函數
  //callback:(data: string) => void 是TypeScript中定義回調函數的類型。
  getCallbackData2(callback: (data: string) => void) {
    //1

    //2
    setTimeout(() => {
      //4
      let name = 'getCallbackData2有callback回調：有值';
      //callback是形參，name是實參。差別就是有沒有實際值而已
      callback(name);
    }, 500);
    //3
  }

  //實際請求樣貌
  //原生Ajax非同步請求
  //當非同步操作成功完成時(then)，調用 resolve 並傳遞結果。
  //當非同步操作失敗時(catch)，調用 reject 並傳遞錯誤。
  getAsyncData(): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch('https://api.example.com/data') // 替換為實際的 API URL
        // .then((response) => {
        //   if (!response.ok) {
        //     throw new Error('Network response was not ok');
        //   }
        //   return response.json(); // 假設返回的是 JSON 格式的數據
        // })
        .then((data) => {
          console.log('成功獲取資料1234:', data); // 打印成功訊息
          resolve(data); // 返回獲取到的數據
        })
        .catch((error) => {
          // console.error('獲取資料失敗1234:', error); // 打印錯誤訊息
          reject(error.message); // 返回錯誤訊息
        });
    });
  }
  //async/await異步方法:將非同步操作寫的像同步操作一樣
  async getAsyncData2(): Promise<any> {
    try {
      const response = await fetch('https://api.example.com/data'); // 替換為實際的 API URL
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      const data = await response.json(); // 假設返回的是 JSON 格式的數據
      console.log('成功獲取資料1234:', data); // 打印成功訊息
      return data; // 返回獲取到的數據
    } catch (error: any) {
      console.error('獲取資料失敗1234:', error); // 打印錯誤訊息
      throw new Error(error.message); // 返回錯誤訊息
    }
  }
  //原生Ajax非同步請求，Promise異步方法：
  getPromiseData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = false; // 模擬成功或失敗的條件
        if (success) {
          resolve('getPromiseData-promise resolve');
        } else {
          reject('getPromiseData-promise reject');
        }
      }, 1000);
    });
  }
  //rxjs Observable用法，可以到其他組件中去訂閱
  getObservableData(): Observable<string> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next('1.成功是鬼');
        observer.error('2.錯了哇操');
      }, 2000);
    });
  }
}
