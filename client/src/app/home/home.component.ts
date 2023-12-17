import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Comment {
  _id: string;
  // ... autres propriétés du commentaire
}

interface Post {
  _id: string;
  comments: Comment[];
  // ... autres propriétés du post
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  displayComments: { [key: string]: boolean } = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<any[]>('http://localhost:4000/api/post').subscribe({
      next: (data) => {
        this.posts = data;
        this.posts.forEach(post => {
          this.displayComments[post._id] = false;
        });
      },
      error: (error) => console.error('Erreur lors de la récupération des posts:', error)
    });
  }

  toggleLike(postId: string): void {
    this.http.post(`http://localhost:4000/api/post/${postId}/likes`, {}).subscribe({
      next: (updatedPost: any) => {
        const index = this.posts.findIndex(p => p._id === updatedPost._id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
      },
      error: (error) => console.error('Erreur lors de la mise à jour du like:', error)
    });
  }

  toggleComments(postId: string): void {
    const post = this.posts.find(p => p._id === postId);
    if (post && !this.displayComments[postId]) {
      post.comments.forEach((comment: Comment) => {
        this.http.get<any>(`http://localhost:4000/api/comment/${comment._id}`).subscribe({
          next: (commentDetails) => {
            const commentIndex = post.comments.findIndex((c: Comment) => c._id === comment._id);
            if (commentIndex !== -1) {
              post.comments[commentIndex] = { ...post.comments[commentIndex], ...commentDetails };
            }
          },
          error: (error) => console.error(`Erreur lors de la récupération des détails du commentaire ${comment._id}:`, error)
        });
      });
      this.displayComments[postId] = true;
    } else {
      this.displayComments[postId] = !this.displayComments[postId];
    }
  }

  deletePost(postId: string): void {


    this.http.delete(`http://localhost:4000/api/post/${postId}`, { withCredentials: true }).subscribe({
      next: () => {
        // Suppression réussie, mettre à jour l'interface utilisateur
        this.posts = this.posts.filter(p => p._id !== postId);
      },
      error: (error) => console.error('Erreur lors de la suppression du post:', error)
    });
  }



  searchPosts() {
    // Logique pour rechercher des posts
  }
}
