import { RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';
@Component({
  selector: 'app-child',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent implements OnInit {
  requestService = inject(RequestService);
  ngOnInit() {}
}
