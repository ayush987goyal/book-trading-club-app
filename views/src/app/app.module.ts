import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { ApolloClient, createNetworkInterface  } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { AllbooksComponent } from './core/allbooks/allbooks.component';
import { MybooksComponent } from './core/mybooks/mybooks.component';
import { MyprofileComponent } from './core/myprofile/myprofile.component';
import { MongoService } from './mongo.service';
import { environment } from '../environments/environment';
import { BookComponent } from './core/book/book.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AddbooksComponent } from './core/addbooks/addbooks.component';
import { ThripletsPipe } from './thriplets.pipe';
import { UserService } from './user.service';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: environment.localUrl + '/graphql'
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AllbooksComponent,
    MybooksComponent,
    MyprofileComponent,
    BookComponent,
    AddbooksComponent,
    ThripletsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [MongoService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
