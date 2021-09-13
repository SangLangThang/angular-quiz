import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ClientForm, ILogin, User } from '../models/User.model';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  usersRef: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.usersRef = this.firestore.collection('users');
  }

  login(payload: ILogin) {
    return this.firestore
      .collection('users', (ref) =>
        ref
          .where('username', '==', payload.username)
          .where('password', '==', payload.password)
      )
      .valueChanges();
  }

  getUsers() {
    return this.usersRef.valueChanges();
  }

  addClient(clientForm: ClientForm) {
    return this.firestore.collection('clients').add(clientForm);
  }
  getClient(clientId: string) {
    return this.firestore.collection('clients').doc(clientId).valueChanges();
  }
  updateClient(clientId: string,score:number) {
    this.firestore.collection('clients').doc(clientId).update({'score':score});
  }

  getLevels() {
    return this.firestore
      .collection('levels')
      .valueChanges({ idField: 'levelId' });
  }
  
  getTopics() {
    return this.firestore
      .collection('topics')
      .valueChanges({ idField: 'topicId' });
  }
  /* getTopics(levelId:string){
     return this.firestore.collection('topics',ref=>ref.where('levelId', '==', levelId))
     .valueChanges({ idField: 'topicId' })
   } */
  getQuestions(topicId: string) {
    return this.firestore
      .collection('questions', (ref) => ref.where('topicId', '==', topicId))
      .valueChanges({ idField: 'questionId' });
  }
  getQuestion(id: string) {
    return this.firestore.collection('questions').doc(id).valueChanges();
  }

  deleteQuestion(questionId: string) {}
}
