import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

const SOCKET_ENDPOINT = 'https://simple-chat-luke.herokuapp.com:8080';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.css']
})
export class InsertUserComponent implements OnInit {
  socket;
  username: string;
  constructor(
    private router: Router,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT, { transports: ['websocket'] });
    console.log(this.socket)
  }

  insertUsername() {
    console.log(this.username)
    this.socket.emit('username', this.username);
    this.utilsService.setUser(this.username)
    this.router.navigate(['chat']);
  }

}
