import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isLargeScreen!: boolean;
  observer!: IntersectionObserver;

  constructor(private breakpointObserver: BreakpointObserver, private el: ElementRef) {}

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

  ngAfterViewInit() {
    const options = {
      rootMargin: '-50px 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }, options);

    const headings = this.el.nativeElement.querySelectorAll('h1');
    headings.forEach((heading: Element) => {
      this.observer.observe(heading);
    });
  }


  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
