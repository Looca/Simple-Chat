import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';
const SOCKET_ENDPOINT = 'localhost:3000';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {

  socket;
  message: string;
  messageList = [];
  userConnected: string;
  username: string;
  onTypingMessage: string;
  timeOut = undefined;
  constructor(
    private router: Router,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.username = this.utilsService.getUser();
    if (!this.username) {
      this.router.navigate([''])
    }
    this.setupSocketConnection();
  }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT, { transports: ['websocket'] });
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        this.messageList.push(data);
        /*const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        element.style.width = '30%';
        document.getElementById('message-list').appendChild(element);*/
      }
      console.log(this.messageList)
    });

    this.socket.on('user-broadcast', (data: string) => {
      if (data) {
        console.log(data)
        this.userConnected = data;
      }
    })

    this.socket.on('on-typing-broadcast', (data: string) => {
      if (data) {
        console.log(data)
        this.onTypingMessage = data + ' sta scrivendo...';
      } else {
        this.onTypingMessage = ''
      }
    })
  }
  onTyping() {
    clearTimeout(this.timeOut);
    this.socket.emit('on-typing', this.username)
  }

  stopTyping() {
    this.timeOut = setTimeout(() => {
      this.socket.emit('on-typing', null)
    }, 3000);
  }

  SendMessage() {
    this.socket.emit('message', { user: this.username, message: this.message, time: new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString() });
    this.messageList.push({ message: this.message, time: new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString() })
    this.message = '';
  }
}
