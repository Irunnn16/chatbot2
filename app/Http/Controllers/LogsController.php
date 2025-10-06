<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLogsRequest;
use App\Http\Requests\UpdateLogsRequest;
use App\Http\Requests\BulkUpdateLogsRequest;
use App\Http\Requests\BulkDeleteLogsRequest;
use App\Models\Category;
use App\Models\Logs;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class LogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index logs");
        
        $data = Logs::query()
            ->with([ 'user', 'category'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('logs/index', [
            'logs' => $data->get(),
            'users' => User::all(),
            'categories' => Category::all(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create logs"),
                'canShow' => $this->user->can("show logs"),
                'canUpdate' => $this->user->can("update logs"),
                'canDelete' => $this->user->can("delete logs"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLogsRequest $request)
    {
        $this->pass("create logs");

        $data = $request->validated();
        Logs::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Logs $logs)
    {
        $this->pass("show logs");

        if ($this->user->cannot('show logs', Logs::class)) {
            return abort(403);
        }

        return Inertia::render('logs/show', [
            'logs' => $logs,
            'permissions' => [
                'canUpdate' => $this->user->can("update logs"),
                'canDelete' => $this->user->can("delete logs"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLogsRequest $request, Logs $logs)
    {
        $this->pass("update logs");

        $data = $request->validated();
        $logs->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Logs $logs)
    {
        $this->pass("delete logs");

        $logs->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateLogsRequest $request)
    {
        $this->pass("update logs");

        $data = $request->validated();
        Logs::whereIn('id', $data['logs_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteLogsRequest $request)
    {
        $this->pass("delete logs");

        $data = $request->validated();
        Logs::whereIn('id', $data['logs_ids'])->delete();
    }

    
    
    
}
