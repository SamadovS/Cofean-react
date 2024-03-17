import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { Member, MemberUpdateData } from "../../types/user";
import { MemberLiken } from "../../types/others";

class MemberApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async loginRequest(login_data: any) {
    try {
      const result = await axios.post(this.path + "/login", login_data, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR >>> loginRequest ${err.message}`);
      throw err;
    }
  }

  public async signupRequest(signup_data: any) {
    try {
      const result = await axios.post(this.path + "/signup", signup_data, {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR >>> loginRequest ${err.message}`);
      throw err;
    }
  }

  // LOGOUT PROCESS
  public async logOutRequest() {
    try {
      const result = await axios.get(this.path + "/logout", {
        withCredentials: true,
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const logout_result = result.data.state;
      // console.log("logout_result>>>", logout_result);
      return logout_result == "success";
    } catch (err: any) {
      console.log(`ERROR >>> logOutRequest ${err.message}`);
      throw err;
    }
  }

  // LIKE PROCESS
  public async memberLikeTarget(data: any) {
    try {
      const url = "/member-liken";
      const result = await axios.post(this.path + url, data, {
        withCredentials: true,
      });
      console.log("likeresult>>>", result);

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);

      const like_result: MemberLiken = result.data.data;
      return like_result;
    } catch (err: any) {
      console.log(`ERROR >>> memberLikeTarget ${err.message}`);
      throw err;
    }
  }

  async getChosenMember(id: string) {
    try {
      let url = `/member/${id}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const member: Member = result.data.data;
      return member;
    } catch (err: any) {
      console.log(`ERROR >>> getChosenMember ${err.message}`);
      throw err;
    }
  }

  // UPDATE MEMBER
  public async updateMemberData(data: MemberUpdateData) {
    try {
      let formData = new FormData();
      formData.append("mb_nick", data.mb_nick || "");
      formData.append("mb_phone", data.mb_phone || "");
      formData.append("mb_address", data.mb_address || "");
      formData.append("mb_description", data.mb_description || "");
      formData.append("mb_image", data.mb_image || "");

      const result = await axios(`${this.path}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR >>> memberLikeTarget ${err.message}`);
      throw err;
    }
  }
}

export default MemberApiService;
