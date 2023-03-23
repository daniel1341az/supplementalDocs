import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isLargeScreen!: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isLargeScreen = !result.matches;
        if (!this.isLargeScreen) {
          this.sidenav.close();
        }
      });
  }

  scrollToElement(target: string): void {
    if (!this.isLargeScreen) {
      this.sidenav.close();
    }
    const targetElement = document.querySelector(target) as HTMLElement;
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
