import { Component, ElementRef, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent {
  columnas: string[] = ['name', 'url'];
  responsiveOptions: any[] = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];;

  dataSource: any;
  targetProducts: any[] = [];

  visible: boolean = false;
  pokemons: any = [];
  selectedPokemon: any;
  detailsPokemon: any;
  constructor(private pokemonService: PokemonService) {}
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((data: any) => {
      this.pokemons = data;
      this.dataSource = new MatTableDataSource<any>(this.pokemons.results);
      this.dataSource.paginator = this.paginator;
    });
  }

  showDialog() {
      this.visible = true;
  }

  getMore() {
    this.pokemonService
      .getPokemonsByBlocks(this.pokemons.next)
      .subscribe((data: any) => {
        if (data.results.length) {
          this.pokemons = data;
          this.dataSource = new MatTableDataSource<any>(this.pokemons.results);
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  getPrevious() {
    this.pokemonService
      .getPokemonsByBlocks(this.pokemons.previous)
      .subscribe((data: any) => {
        if (data.results.length) {
          this.pokemons = data;
          this.dataSource = new MatTableDataSource<any>(this.pokemons.results);
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  onRowSelect(row: any) {
    console.log(row);
    this.pokemonService.getDetailsPokemon(row.data.url).subscribe((data:any) => {
      console.log(data);
      this.detailsPokemon = data;
      this.detailsPokemon.images = [];
      this.detailsPokemon.images.push(data.sprites.back_default)
      this.detailsPokemon.images.push(data.sprites.back_female)
      this.detailsPokemon.images.push(data.sprites.back_shiny)
      this.detailsPokemon.images.push(data.sprites.back_shiny_female)
      this.showDialog();
    })
  }
  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
          return
    }
}

getAbilities(){
  return this.detailsPokemon.abilities;
}

getGames(){
  return this.detailsPokemon.game_indices;
}
}
