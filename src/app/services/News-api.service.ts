import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InewsApi } from '../interfaces';



const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  pageArticles = 0;
  pageCategoria = 0;
  categoriaActual = '';

  constructor(private htpp: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    query = apiUrl + query;
    return this.htpp.get<T>(query, {headers})
  }
  

  getTopArticles(){
    this.pageArticles++;
    return this.ejecutarQuery<InewsApi>(`/top-headlines?country=co&page=${this.pageArticles}`)
  }

  getArticlesCategoria(categoria: string){
    if(this.categoriaActual === categoria){
      this.pageCategoria++;
    } else {
      this.pageCategoria = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<InewsApi>(`/top-headlines?country=co&category=${categoria}&page=${this.pageCategoria}`)
  }
}
