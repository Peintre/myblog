package com.peintre.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 接口状态码枚举
 *
 * @author Peintre
 * @date 2021/06/11
 **/
@Getter
@AllArgsConstructor
public enum StatusCode {
    /**
     * 成功
     */
    SUCCESS(20000, "操作成功"),
    /**
     * 未登录
     */
    NO_LOGIN(30000, "用户未登录"),
    /**
     * 登录成功
     */
    LOGIN_SUCCESS(31000, "登录成功"),
    /**
     * 用户名不存在
     */
    USER_NO_EXIST(32000, "用户名不存在！"),
    /**
     * 密码错误
     */
    ERROR_PASSWORD(33000, "密码错误！"),
    /**
     * 用户名不能为空
     */
    USER_NO_BLANK(34000, "用户名不能为空！"),

    /**
     * 用户登录已过期
     */
    USER_LOGIN_EXPIRED(35000, "用户登录已过期！"),


    /**
     * 没有操作权限
     */
    AUTHORIZED(40300, "没有操作权限"),
    /**
     * 系统异常
     */
    SYSTEM_ERROR(50000, "系统异常"),
    /**
     * 失败
     */
    FAIL(51000, "操作失败"),
    /**
     * 参数校验失败
     */
    VALID_ERROR(52000, "参数格式不正确"),
    /**
     * 用户名已存在
     */
    USERNAME_EXIST(52001, "用户名已存在"),
    /**
     * 用户名不存在
     */
    USERNAME_NOT_EXIST(52002, "用户名不存在"),
    /**
     * qq登录错误
     */
    QQ_LOGIN_ERROR(53001, "qq登录错误"),
    /**
     * 微博登录错误
     */
    WEIBO_LOGIN_ERROR(53002, "微博登录错误"),
    /**
     * 角色名已存在
     */
    ROLENAME_EXIST(54001, "角色名已存在"),
    /**
     * 角色不存在
     */
    ROLE_NOT_EXIST(54002, "角色不存在");

    /**
     * 状态码
     */
    private final Integer code;

    /**
     * 描述
     */
    private final String desc;

}
