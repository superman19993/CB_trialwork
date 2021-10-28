<?php

class WorkspaceModel extends BaseModel
{

    public function getAllWorkspace($uid)
    {
        $sql = "SELECT workspaces.* FROM workspaces INNER JOIN users_workspaces ON workspaces.id = users_workspaces.workspaceid WHERE users_workspaces.userid='$uid'";
        $workspace = $this->_query($sql);
        $data = [];
        while ($row = mysqli_fetch_assoc($workspace)) {
            array_push($data, $row);
        }
        return $data;
    }

    public function findWorkspaceById($id)
    {
        $sql = "SELECT * FROM workspaces where id='$id'";
        $createdWorkspace = $this->_query($sql);
        return mysqli_fetch_assoc($createdWorkspace);
    }

    public function createWorkspace($name, $uid)
    {
        $id = uniqid();
        $sql = "INSERT INTO workspaces (id, workspace_name, uid) values ('$id', '$name', '$uid')";
        $this->_query($sql);
        $sql = "INSERT INTO users_workspaces (userid, workspaceid) values ('$uid', '$id')";
        $this->_query($sql);

        $createdWorkspace = $this->findWorkspaceById($id);
        return $createdWorkspace;
    }

    public function updateWorkspace($name, $uid, $wid)
    {
        $sql = "UPDATE workspaces set workspace_name='$name' where id='$wid' and uid='$uid'";
        $this->_query($sql);
        $updatedWorkspace = $this->findWorkspaceById($wid);
        return $updatedWorkspace;
    }

    public function deleteWorkspace($wid, $uid)
    {
        $sql = "DELETE from workspaces where id='$wid' and uid='$uid'";
        return $this->_query($sql);
    }

    public function inviteUserWorkspace($username, $wid)
    {
        $sql = "SELECT * from users where username='$username'";
        $user = $this->_query($sql);
        $foundUser = mysqli_fetch_assoc($user);
        $uid = $foundUser['id'];
        $sql = "INSERT INTO users_workspaces (userid, workspaceid) values ('$uid', '$wid')";
        return  $this->_query($sql);
    }

    public function getAllUsers($wid)
    {
        $sql = "SELECT username from users_workspaces join users on users.id = users_workspaces.userid where workspaceid='$wid'";
        $res = $this->_query($sql);
        $usernameList = [];
        while ($row = mysqli_fetch_assoc($res)) {
            array_push($usernameList, $row['username']);
        }
        return $usernameList;
    }
}