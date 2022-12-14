//============== 表单操作 ========================
//Copyright 2023 何镇汐
//Licensed under the MIT license
//================================================
import { HttpMethod } from "../http/http-method";
import { Util } from "../util";
import { AppConfig,initAppConfig } from "../config/app-config";
import { IFormSubmitOptions } from "./form-submit-option";

/**
 * 表单操作
 */
export class Form {
    /**
     * 应用配置
     */
    private config: AppConfig;

    /**
     * 
     * @param util 公共操作
     */
    constructor(private util: Util) {
        this.config = util.getAppConfig();
        initAppConfig(this.config);
    }

    /**
     * 提交表单
     * @param options 表单提交参数
     */
    submit( options: IFormSubmitOptions ) {
        if ( !this.validateSubmit( options ) )
            return;
        if ( !options.confirm ) {
            this.submitForm( options );
            return;
        }
        this.util.message.confirm( {
            title: options.confirmTitle,
            content: options.confirm,
            onOk: () => this.submitForm( options ),
            onCancel: options.complete
        } );
    }

    /**
     * 提交表单验证
     */
    private validateSubmit( options: IFormSubmitOptions ) {
        if ( !options ) {
            console.log( "表单参数 options 未设置" );
            return false;
        }
        if ( options.form && !options.form.valid )
            return false;
        if ( !options.url ) {
            console.log( "表单url未设置" );
            return false;
        }
        if ( !options.data ) {
            console.log( "表单数据未设置" );
            return false;
        }
        return true;
    }

    /**
     * 提交表单
     */
    private submitForm( options: IFormSubmitOptions ) {
        this.initHttpMethod( options );
        this.util.webapi.send( options.url, options.httpMethod, options.data )
            .header( options.header )
            .button( options.button )
            .loading( options.loading || false )
            .handle( {
                before: () => {
                    return options.before && options.before( options.data );
                },
                ok: result => {
                    this.okHandler( options, result );
                },
                fail: result => {
                    this.failHandler( options, result );
                },
                complete: options.complete
            } );
    }

    /**
     * 初始化Http方法
     * @param options
     */
    private initHttpMethod( options: IFormSubmitOptions ) {
        if ( options.httpMethod )
            return;
        options.httpMethod = options.data.id ? HttpMethod.Put : HttpMethod.Post;
    }

    /**
     * 失败处理函数
     */
    private failHandler( options: IFormSubmitOptions, result ) {
        if ( options.form)
            ( options.form as { submitted: boolean } ).submitted = false;
        options.fail && options.fail( result );
        if ( options.showErrorMessage !== false )
            this.util.message.error( result.message );
    }

    /**
     * 成功处理函数
     */
    private okHandler( options: IFormSubmitOptions, result ) {
        options.ok && options.ok( result );
        if ( options.showMessage !== false )
            this.util.message.success( options.message || this.config.text.successed );
        if ( options.back )
            this.util.router.back();
        if ( options.closeDialog ) {
            result = result || "ok";
            this.util.dialog.close(result);
        }
    }
}