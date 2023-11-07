import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-war-movies',
  templateUrl: './war-movies.page.html',
  styleUrls: ['./war-movies.page.scss'],
})
export class WarMoviesPage implements OnInit {
  movies = [];
  genres = null;
  currentPage = 1; 
  imageBaseUrl = environment.images;
  searchTerm : string;

  constructor(private movieService: MovieService, private loadingctrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
    this.ShowGenreMovies();
   }
 
   async loadMovies(event?){
     const loading = await this.loadingctrl.create({
       message: 'Loading..',
       spinner: 'bubbles',
     });
 
     await loading.present();
 
     this.movieService.getWarMovies(this.currentPage).subscribe((res)=>{
       loading.dismiss();
      // this.movies = [...this.movies,...res.results ]
       this.movies.push(...res.results);
       //console.log(res['genres'][0]);
       console.log(res);
 
       event?.target.complete();
       if (event) {
         event.target.disabled = res.total_pages === this.currentPage;
       }  
     });
   }
   loadMore(event: InfiniteScrollCustomEvent) {
     this.currentPage++;
     this.loadMovies(event);
   }
 
   ShowGenreMovies(){
       this.movieService.getListGenreMovies().subscribe(res =>{
         this.genres = res['genres'];
         console.log("liste genre",res['genres']);
     });
   }

}
