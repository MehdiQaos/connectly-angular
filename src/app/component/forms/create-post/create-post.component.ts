import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/model/Post';
import { ImageService } from 'src/app/service/image.service';
import { PostService } from 'src/app/service/post.service';
import { StoreService } from 'src/app/service/store.service';

import { alertFailure, alertSuccess } from 'src/app/utils/Alerts-utils';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  postContent = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  profilePictureUrl: string | null = null;
  user;
  form: FormGroup;
  post = new Post();

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private postService: PostService,
    private imageService: ImageService,
  ) {
    this.user = this.store.user;
    this.profilePictureUrl = imageService.getImageUrl(
      this.user.profilePictureLocation,
    );
    this.form = this.fb.group({
      content: ['', Validators.required],
      file: [''],
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file) {
      this.selectedFile = file[0];
      this.imagePreview = URL.createObjectURL(this.selectedFile);
      // this.form.patchValue({ file: this.selectedFile });
    }
  }

  onRemoveImage() {
    this.selectedFile = null;
    this.imagePreview = null;
    // this.form.patchValue({ file: null });
  }

  onSubmit() {
    if (!this.form.get('content')?.value)
      return;
    const formData = new FormData();
    formData.append('content', this.form.get('content')?.value);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.postService.createPost(this.user.id, formData).subscribe({
      next: (response) => {
        console.log('Post created successfully');
        console.log(response);
        this.clearForm();
        alertSuccess('Post added successfully');
      },
      error: (error) => {
        alertFailure('Post could not be created');
        console.error(error);
      },
    });
  }

  clearForm() {
    this.form.reset();
    this.selectedFile = null;
    this.imagePreview = null;
  }
}
