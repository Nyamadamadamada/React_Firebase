import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";

import tagIcon from "../assets/tag.svg";
import { UserStruct } from "../types/firestore";
import { storage } from "../firebase";

type Props = {
  user: UserStruct;
  handleOpenModal: (id: string) => void;
};
const UserListItem = (props: Props) => {
  // 演習1-2 画像表示のためのurl変数を設置
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    // 演習1-2 Firebaseからファイルパスを取得
    getDownloadURL(ref(storage, `${props.user.id}/${props.user.file}`))
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  // 演習1-1-2 UserListにあるここから〜ここまでのReact要素を移す
  const id = typeof props.user.id !== "undefined" ? props.user.id : "";
  return (
    <div className="row g-0">
      <div className="col-md-4">
        <img src={url} className="w-100" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          {/* 演習1-1 */}
          <h5 className="card-title">{props.user.name}</h5>
          <p className="card-text">{props.user.comment}</p>

          <div className="card-text text-muted interest-tag">
            <ul className="d-flex">
              <li>
                <img src={tagIcon} alt="icon" />
              </li>
              {/* 演習1-1 */}
              {props.user.tags &&
                props.user.tags.map((tag, index) => (
                  <li key={index}>{tag.label}</li>
                ))}
            </ul>
          </div>
          <div className="">
            <button
              type="button"
              className="btn btn-primary fw-bold fs-6 me-2"
              onClick={() => props.handleOpenModal(id)}
            >
              編集
            </button>
            <button
              type="button"
              className="btn btn-secondary fw-bold fs-6 me-2"
            >
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
