import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public loginSuccess: boolean | null = null; // 用於存儲登錄狀態

  @Output() closeLogin = new EventEmitter<void>(); // 定義事件發射器
  @Output() loginSuccessEvent = new EventEmitter<string>(); // 定義事件發射器來傳遞用戶名

  submit(): void {
    const defaultUsername = 'henry';
    const defaultPassword = '123';

    if (this.username.trim() === '' || this.password.trim() === '') {
      this.loginSuccess = false;
      alert('登入失敗'); // 顯示登入失敗的彈窗
    } else if (
      this.username === defaultUsername &&
      this.password === defaultPassword
    ) {
      console.log('用戶名:', this.username);
      console.log('密碼:', this.password);
      this.loginSuccess = true;
      alert(`${this.username}歡迎回來`); // 顯示登錄成功的彈窗
      this.loginSuccessEvent.emit(this.username); // 發射事件來傳遞用戶名
      this.close(); // 關閉登錄畫面
    } else {
      this.loginSuccess = false;
      alert('登入失敗'); // 顯示登入失敗的彈窗
    }
  }

  close(): void {
    this.closeLogin.emit(); // 發射事件來關閉登錄畫面
  }
}
