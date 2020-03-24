import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import  _ from 'lodash'
import { members } from 'src/members';


@Component({
  selector: 'app-team-list-view',
  templateUrl: './team-list-view.component.html',
  styleUrls: ['./team-list-view.component.scss']
})
export class TeamListViewComponent implements OnInit {
  @ViewChild('memberName', {static: false}) memberName: ElementRef;
  members: AngularFireList<any>;
  teamMembers: any = [];
  constructor(private db: AngularFireDatabase) {
    this.members = db.list('/members');
  }

  ngOnInit() {
    this.getMembers();
  }

  getMembers(){
    this.members.snapshotChanges().subscribe(members => {
      this.teamMembers = []
      members.forEach(item => {
        const member = item.payload.toJSON();
        const key = item.key;
        const firstName = member.toString().split(' ')[0];
        const lastName = member.toString().split(' ')[1];
        const name = _.capitalize(firstName)+' '+ _.capitalize(lastName)
        this.teamMembers.push({ key, name });
      })
      this.teamMembers.sort(() => Math.random() - 0.5)
    }
    );
  }

  addMember(name) {
    this.members.push(name);
    this.memberName.nativeElement.value  = '';
  }

  deleteMember(key) {
    this.members.remove(key);
  }

  selectMember(key) {
    this.teamMembers.forEach(member => {
      member.key === key
      ? { ...member, selected: true }
      : { ...member, selected: false }
    })
  }
  
}
