<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProspectRequest;
use App\Http\Requests\UpdateProspectRequest;
use App\Http\Requests\BulkUpdateProspectRequest;
use App\Http\Requests\BulkDeleteProspectRequest;
use App\Models\Prospect;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ProspectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index prospect");
        
        $data = Prospect::query()
            //->with(['media'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('prospect/index', [
            'prospects' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create prospect"),
                'canShow' => $this->user->can("show prospect"),
                'canUpdate' => $this->user->can("update prospect"),
                'canDelete' => $this->user->can("delete prospect"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProspectRequest $request)
    {
        $this->pass("create prospect");

        $data = $request->validated();
        Prospect::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Prospect $prospect)
    {
        $this->pass("show prospect");

        if ($this->user->cannot('show prospect', Prospect::class)) {
            return abort(403);
        }

        return Inertia::render('prospect/show', [
            'prospect' => $prospect,
            'permissions' => [
                'canUpdate' => $this->user->can("update prospect"),
                'canDelete' => $this->user->can("delete prospect"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProspectRequest $request, Prospect $prospect)
    {
        $this->pass("update prospect");

        $data = $request->validated();
        $prospect->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prospect $prospect)
    {
        $this->pass("delete prospect");

        $prospect->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateProspectRequest $request)
    {
        $this->pass("update prospect");

        $data = $request->validated();
        Prospect::whereIn('id', $data['prospect_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteProspectRequest $request)
    {
        $this->pass("delete prospect");

        $data = $request->validated();
        Prospect::whereIn('id', $data['prospect_ids'])->delete();
    }

    
    
    
}
