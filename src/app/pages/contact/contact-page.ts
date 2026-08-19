import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  imports: [],
  templateUrl: './contact-page.html',
})
export default class ContactPage implements OnInit {
   private title = inject(Title);
  private meta = inject(Meta);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if(isPlatformBrowser(this.platformId)) {
      // Aquí puedes colocar código que solo se ejecutará en el navegador, como por ejemplo, manipulación del DOM o uso de APIs del navegador.
    // }
    this.title.setTitle('Contact Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Contact Page',
    });
    this.meta.updateTag({ name: 'og:title', content: 'Contact Page' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'contenido,contact,page',
    });
  }
}

