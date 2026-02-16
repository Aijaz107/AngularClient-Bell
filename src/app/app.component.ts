import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application component
 *
 * Acts as a simple shell that contains the router outlet. Keep this component
 * minimal; routing and feature logic are handled by the feature components.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /** App title used by legacy test scaffolding */
  title = 'ng-flask';
}
