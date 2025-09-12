<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Requests\BulkUpdateArticleRequest;
use App\Http\Requests\BulkDeleteArticleRequest;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UploadArticleMediaRequest;


class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index article");
        
        $data = Article::query()
            //->with(['media'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('article/index', [
            'articles' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create article"),
                'canShow' => $this->user->can("show article"),
                'canUpdate' => $this->user->can("update article"),
                'canDelete' => $this->user->can("delete article"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $this->pass("create article");

        $data = $request->validated();
        Article::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $this->pass("show article");

        if ($this->user->cannot('show article', Article::class)) {
            return abort(403);
        }

        return Inertia::render('article/show', [
            'article' => $article,
            'permissions' => [
                'canUpdate' => $this->user->can("update article"),
                'canDelete' => $this->user->can("delete article"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        $this->pass("update article");

        $data = $request->validated();
        $article->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $this->pass("delete article");

        $article->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateArticleRequest $request)
    {
        $this->pass("update article");

        $data = $request->validated();
        Article::whereIn('id', $data['article_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteArticleRequest $request)
    {
        $this->pass("delete article");

        $data = $request->validated();
        Article::whereIn('id', $data['article_ids'])->delete();
    }

    
    
    /**
     * Register media conversions.
     */
    public function uploadMedia(UploadArticleMediaRequest $request, Article $article)
    {
        $this->pass("update article");

        $data = $request->validated();
        $article->addMedia($data['file'])->toMediaCollection();
    }
}
