import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  content: string;

  @ViewChild('fileInput') fileInput;
  @ViewChild('file') file;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      fileToUpload: null
    });
  }

  ngOnInit() {
  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      // event.target.files[0]  is file-object itself
      const file = event.target.files[0];
      // reader.readAsDataURL(file);
      // reader.readAsText(file);
      reader.readAsBinaryString(file);
      // reader.readAsArrayBuffer(file);
      reader.onload = () => {
        // this.form.get('fileToUpload').setValue({
        //   filename: file.name,
        //   filetype: file.type,
        //   value: reader.result.split(',')[1]
        // });
        this.content = reader.result;
        console.log(this.content);
        console.log(typeof this.content);
        const obj = JSON.parse(this.content);
        console.log(obj.promotions);



        // const blob = new Blob([obj], {
        //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-16le'
        // });
        // saveAs(blob, 'export.xls');
      };

    }
  }

  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    setTimeout(() => {
      console.log(formModel);
      alert('done!');
      this.loading = false;
    }, 1000);
    // this.fileInput.resetForm();
  }

  clearFile() {
    this.form.get('fileToUpload').setValue(null);
    this.file.nativeElement.value = '';
  }

}
