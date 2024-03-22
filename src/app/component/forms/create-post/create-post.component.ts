import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ImageService } from 'src/app/service/image.service';
import { MemberService } from 'src/app/service/member.service';
import { PostService } from 'src/app/service/post.service';
import { StoreService } from 'src/app/service/store.service';

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

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private http: HttpClient,
    private memberService: MemberService,
    private auth: AuthService,
    private postService: PostService,
    private imageService: ImageService
  ) {
    this.user = this.store.user;
    this.profilePictureUrl = imageService.getImageUrl(this.user.profilePictureLocation);
    this.form = this.fb.group({
      content: ['', Validators.required],
      file: [''],
      isPublic: [true, Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file) {
      this.selectedFile = file[0];
      this.imagePreview = URL.createObjectURL(this.selectedFile);
      this.form.patchValue({ file: this.selectedFile });
    }
  }

  onRemoveImage() {
    this.selectedFile = null;
    this.imagePreview = null;
    this.form.patchValue({ file: null });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('content', this.form.get('content')?.value);
    formData.append('isPublic', this.form.get('isPublic')?.value);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.postService.createPost(this.user.id, formData).subscribe({
      next: (response) => {
        console.log('Post created successfully');
        console.log(response);
        this.clearForm();
      },
      error: (error) => {
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