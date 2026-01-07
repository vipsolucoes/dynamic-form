import { Component } from '@angular/core';
import { TestFormComponent } from './test-form/test-form.component';

@Component({
  selector: 'app-root',
  imports: [TestFormComponent],
  template: '<app-test-form />',
  styleUrl: './app.scss'
})
export class App {}
