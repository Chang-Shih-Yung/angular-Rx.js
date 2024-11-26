import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [RequestService],
})
//implements OnInit代表規範：該class必須實作OnInit這個方法
export class HomeComponent implements OnInit {
  public data: string = '';
  //service注入：官方用法
  constructor(public requestService: RequestService) {}

  ngOnInit(): void {
    //獲取同步方法
    this.data = this.requestService.getData();

    //獲取非同步方法
    console.log(this.requestService.getCallbackData1());

    //獲取非同步方法
    this.requestService.getCallbackData2((callback) => {
      console.log(callback);
    });

    //獲取Promise異步方法
    this.requestService
      .getPromiseData()
      .then((data) => {
        console.log('喔耶:', data);
      })
      .catch((error) => {
        console.error('慘:', error);
      });
    //獲取Promise異步方法
    //或可以把async寫在ngOnInit，變成async ngOnInit()：這樣就不用(async () => {})()。ngOnInit型別變成Promise<void>
    //async -> try/catch
    (async () => {
      try {
        const promiseData = await this.requestService.getPromiseData();
        console.log('成功獲取Promise資料:', promiseData);
      } catch (error) {
        console.error('Error fetching promise data:', error);
      }
    })();

    //獲取實際請求樣貌
    this.requestService
      .getAsyncData2()
      .then((data) => {
        console.log('成功獲取資料:', data);
      })
      .catch((error) => {
        console.error('獲取資料失敗:', error);
      });

    //rxjs用法
    //成功：在subscribe內傳遞成功訊息
    this.requestService.getObservableData().subscribe((rxjsData) => {
      //來自observer.next(name);的值
      console.log(rxjsData);
    });

    //這裡不會有任何訊息，因為中途取消訂閱
    let a = this.requestService.getObservableData();
    let d = a.subscribe((data) => {
      console.log(data);
    });
    setTimeout(() => {
      d.unsubscribe();//1秒取消訂閱
     }, 1000);
  }
}
