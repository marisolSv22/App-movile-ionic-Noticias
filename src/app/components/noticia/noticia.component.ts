import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/index';

import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from "../../services/storage.service";

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;

  constructor( private actionSheetCtrl: ActionSheetController,
               private iab: InAppBrowser,
               private social: SocialSharing,
               private storageServ: StorageService) { }

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async mostrarOpc() {

    const noticiaEnFavoritos = this.storageServ.noticiaEnFavoritos(this.noticia)

    const actionSheet = await this.actionSheetCtrl.create ({
      buttons: [
          {
            text: 'Compartir',
            icon: 'share',
            handler: () => {
              this.social.share(
                this.noticia.title,
                this.noticia.source.name,
                '',
                this.noticia.url
              );
            }
          },
          {
            text: noticiaEnFavoritos ? 'Eliminar de favoritos' : 'Guardar en favoritos',
            icon: noticiaEnFavoritos ? 'heart-half-outline' : 'heart-outline',
            handler: () => {
              this.storageServ.guardarEliminarNoticia(this.noticia);
            }
          },
          {
            text: 'Cancel',
            icon: 'close-outline',
            data: {
              action: ('cancel'),
            },
          },
        ]
      });
      actionSheet.present();
  }


}
