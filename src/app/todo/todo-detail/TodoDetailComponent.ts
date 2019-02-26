import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';
@Component({
    selector: 'app-todo-detail',
    templateUrl: './todo-detail.component.html',
    styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
    todo$;
    constructor(private router: Router, private route: ActivatedRoute, private db: DbService) { }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.todo$ = this.db.doc$(`todos/${id}`);
    }
    goBack() {
        this.router.navigate(['/todo']);
        console.log('hm');
    }
}