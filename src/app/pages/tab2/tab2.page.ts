import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from '../../interfaces/index';
import { NewsApiService } from "../../services/News-api.service";
import { IonSegment } from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segmento : IonSegment;

  categorias: string[] = ['business','entertainment','general','health','science','sports','technology']
  noticias: Article[] = [];

  constructor(private noticiasServ: NewsApiService) {}

  ngOnInit() {
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event){
    this.noticias = [];
    this.cargarNoticias(event.detail.value)
  }

  cargarNoticias(categoria: string, event?){
    this.noticiasServ.getArticlesCategoria(categoria)
      .subscribe(resp=> {

        this.noticias.push(...resp.articles);

        if (event){
          event.target.complete();
        }
      });
  }

  loadData(event){
    this.cargarNoticias(this.segmento.value, event)
  }

}
