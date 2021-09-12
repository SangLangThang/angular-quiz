import { AdminBoxComponent } from './admin-box.component';
import { ManagerClientsComponent } from './manager-clients/manager-clients.component';
import { ManagerQuestionsComponent } from './manager-questions/manager-questions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FormQuestionComponent } from './manager-questions/form-question/form-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  declarations: [
    ManagerQuestionsComponent,
    ManagerClientsComponent,
    AdminBoxComponent,
    FormQuestionComponent,
  ],
})
export class AdminModule {}
