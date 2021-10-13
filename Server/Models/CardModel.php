<?php
class CardModel extends BaseModel{
    const TABLE= 'cards';

    public function store($data){
        return $this->create(self::TABLE, $data);
    }

    public function updateData($id, $data){
        return $this->update(self::TABLE,$id ,$data);
    }

    public function find($id){
        return $this->getById(self::TABLE, $id);
    }

}
?>