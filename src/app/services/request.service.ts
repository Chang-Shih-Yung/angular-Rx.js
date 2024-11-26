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
    return 'this is a service data';
  }

  //非同步方法//

  //這裡會返回undefined，因為沒有回調函數
  getCallbackData1() {
    //1

    //2
    setTimeout(() => {
      //4
      let name = 'callback data';
      return name;
    }, 1000);
    //3
    //一般來說這裡會先執行，因為setTimeout是非同步的：然後如果沒有回調函數，這裡會返回undefined
  }

  //這裡會返回'有回調：有值'，因為有回調函數
  //callback:(data: string) => void 是TypeScript中定義回調函數的類型。
  getCallbackData2(callback: (data: string) => void) {
    //1

    //2
    setTimeout(() => {
      //4
      let name = '有回調：有值';

      callback(name);
    }, 500);
    //3
  }
  //原生Ajax非同步請求
  getPromiseData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let name = 'promise data';
        resolve(name);

        let error = 'promise error';
        reject(error);
      }, 1000);
    });
  }
  //實際請求樣貌
  //原生Ajax非同步請求
  //當非同步操作成功完成時(then)，調用 resolve 並傳遞結果。
  //當非同步操作失敗時(catch)，調用 reject 並傳遞錯誤。
  async getAsyncData2(): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch('https://api.example.com/data') // 替換為實際的 API URL
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // 假設返回的是 JSON 格式的數據
        })
        .then((data) => {
          console.log('成功獲取資料1234:', data); // 打印成功訊息
          resolve(data); // 返回獲取到的數據
        })
        .catch((error) => {
          console.error('獲取資料失敗1234:', error); // 打印錯誤訊息
          reject('Failed to fetch data: ' + error.message); // 返回錯誤訊息
        });
    });
  }

  getObservableData():Observable<string> {
    return new Observable((observer) => {
      setTimeout(() => {
        let name = 'observable data:我是Rxjs';
        observer.next(name);
      }, 2000);
    });
  }
}
