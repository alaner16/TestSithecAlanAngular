import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient) { }

  getPokemons(){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=100`)
    .pipe(
      catchError(this.error)
    );
  }

  getPokemonsByBlocks(request: string){
    return this.http.get(`${request}`)
    .pipe(
      catchError(this.error)
    );
  }

  getDetailsPokemon(request: string){
    return this.http.get(`${request}`)
    .pipe(
      catchError(this.error)
    );
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
