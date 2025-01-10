import { Component, inject, OnInit } from '@angular/core';
import { RequestService } from './services/request.service';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LoginComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [RequestService],
})
export class AppComponent implements OnInit {
  requestService = inject(RequestService);

  public request: string = '';
  public showLogin: boolean = false;
  public welcomeMessage: string | null = null; // 存儲歡迎會員訊息
  public isLoggedIn: boolean = false; // 登錄狀態

  ngOnInit(): void {
    this.request = this.requestService.getData2();
  }

  toggleRequest(): void {
    this.request = this.request === '調用成功' ? '狀態已切換' : '調用成功';
  }

  toggleLogin(): void {
    if (this.isLoggedIn) {
      this.logout(); // 如果已登錄，則執行登出
    } else {
      this.showLogin = !this.showLogin; // 切換登錄畫面的顯示狀態
    }
  }

  closeLogin(): void {
    this.showLogin = false; // 隱藏登錄畫面
  }

  onLoginSuccess(username: string): void {
    this.welcomeMessage = `${username} 歡迎回來`; // 設置歡迎訊息
    this.isLoggedIn = true; // 設置登錄狀態
    this.showLogin = false; // 隱藏登錄畫面
  }

  logout(): void {
    this.isLoggedIn = false; // 重置登錄狀態
    this.welcomeMessage = null; // 清除歡迎訊息
    alert('登出成功'); // 顯示登出成功的彈窗
  }
}
