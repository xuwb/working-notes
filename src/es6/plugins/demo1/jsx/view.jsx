"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	const React = require('react');
	const Actions = require('./controller').Actions;

	// 非独立组件
	const Form = require('../input/form');
	const Text = require('../input/text');
	const Button = require('../input/button');

	class View extends React.Component {
		render(){ 
			var me = this,
				props = me.props;
			return (
				<div>
					<Form ajaxConfig={ {type: 'get'} } paramName="param" onAjax={function(val){console.log(val)}}>
						<table width="100%" className="fn-table fn-table-input fn-MT20 fn-color-666" ref="tabel">
							<tbody>
								<tr>
									<td style={ {textAlign: 'right'} } className="fn-LH30" width="80">姓名：</td>
									<td>
										<Text name="name" data-required="true" />
									</td>
								</tr>
								{do{
									if(!props.hiddenTel){
										<tr>
											<td style={ {textAlign: 'right'} } className="fn-LH30">电话号码：</td>
											<td>
												<Text name="mobile" data-required="true" data-errormessage-mobile="请填写正确的电话号码" data-rule="mobile" />
											</td>
										</tr>
									}
								}}
								<tr>
									<td> </td>
									<td>
										<Button type="submit" style={ {marginRight: "5px"} } />
										{do{
											if(!props.hiddenTel){
												<Button type="button" style={ {marginRight: "5px"} } value="隐藏电话号码" onClick={ Actions.hiddenTel } />
											}else{
												<Button type="button" value="显示电话号码" onClick={ Actions.showTel } />
											}
										}}
									</td>
								</tr>
							</tbody>
						</table>
					</Form>
					
				</div>
			);
		}
	};

	return View;

});