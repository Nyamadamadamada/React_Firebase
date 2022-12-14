import { useEffect, useState } from "react";
import Modal from "../components/common/Modal";
import UserForm from "../components/UserForm";
import SearchUserForm from "../components/SearchUserForm";
import CreateUserForm from "../components/CreateUserForm";
import UserListItem from "../components/UserListItem";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function UserList() {
  // 演習1-1-1 usersのstateを作成
  const [users, setUsers] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);
  const handleOpenModal = (id: string) => {
    setUserId(id);
    setIsShow(true);
  };
  // useEffectは初回読み込み時に通るHook
  useEffect(() => {
    // 演習1-1-1 Firebaseからデータを呼び出す
    // 演習1-1-1 firestoreからのデータをusersへ格納
    (async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const tmpUsers: any[] = [];
      querySnapshot.docs.forEach((doc) => {
        tmpUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsers(tmpUsers);
    })();
  }, []);

  return (
    <div className="UserList">
      <main>
        <div className="container my-3">
          <h1 className="h2 my-2">
            ※このページをReactとFirebaseをつかって動的なサイトにします
          </h1>
          <h3 className="fw-bold">参加者一覧</h3>
          <div className="row d-flex flex-column-reverse flex-xl-row">
            <div className="col-12 col-xl-8">
              <div className="content-info">
                <div className="content-info-item">
                  {/* 演習1-1 */}
                  登録者人数の合計：{users.length}人
                </div>
                <div className="content-sort">
                  <div>並び順：</div>
                  <div>
                    <a href="#">新着順</a>
                  </div>
                  <div>&nbsp;|&nbsp;</div>
                  <div>
                    <a href="#">50音順</a>
                  </div>
                </div>
              </div>
              <div className="card mb-3">
                {/* 演習1-1-2 ここから */}
                {users.map((user, index) => (
                  <UserListItem
                    user={user}
                    handleOpenModal={handleOpenModal}
                    key={index}
                  />
                ))}

                {/* 演習1-1-2 ここまでがUserListItemへ移せる */}
              </div>
              <p className="h4">
                <Link to="/">トップページに戻る</Link>
              </p>
            </div>
            <div className="col-12 col-xl-4 d-xl-block my-5">
              <h4 className="fw-bold">絞り込み</h4>
              <div className="card search-user">
                <div className="card-body">
                  <SearchUserForm />
                </div>
              </div>
              <div className="mt-4">
                <h4 className="fw-bold">新規追加</h4>
                <div className="card search-user">
                  <div className="card-body">
                    <CreateUserForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="py-5 mt-5 text-muted border-top">
            Created by the Bootstrap and Hogehoge &middot; &copy; 2022
          </footer>
        </div>
      </main>

      {isShow && (
        <Modal title={"編集"} setIsShow={setIsShow}>
          <UserForm id={userId} setIsShow={setIsShow} />
        </Modal>
      )}
    </div>
  );
}

export default UserList;
