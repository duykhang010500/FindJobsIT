<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- <title>Xác nhận đơn hàng</title> -->
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<style type="text/css">
		* {
			font-family: Verdana, Arial, sans-serif;
		}
		table{
			font-size: x-small;
		}
		tfoot tr td{
			font-weight: bold;
			font-size: x-small;
		}
		.gray {
			background-color: lightgray
		}
	</style>
</head>
<body>
	<div width="100%" style="border-radius: 12px;padding:15px;">
		<div class="col-md-12" >
			<div class="row" style="padding: 15px">

				<div class="col-md-6" style="text-align: center;color: red;font-weight: bold;font-size: 30px">
					<h4 style="margin:0">NEW USER APPLY TO JOB</h4>
				</div>
				<div class="col-md-6"  style="color: #fff">
					<p>CONTACT INFORMATION</p>
				</div>
				{{$info['name']}}
				<!-- <div class="col-md-12">
					<p>Name:
						@if($info['name']=='')
							<strong style="color:#fff">không có</strong>
						@else
							<strong style="color:#fff">{{$info['name']}}</strong>
						@endif
					</strong></p>
					<p>Phone:
						@if($info['phone']=='')
							<strong style="color:#fff">không có</strong>
						@else
							<strong style="color:#fff">{{$info['phone']}}</strong>
						@endif
					</strong></p>
					<p>Email:
						@if($info['email']=='')
							<strong style="color:#fff">không có</strong>
						@else
							<strong style="color:#fff">{{$info['email']}}</strong>
						@endif
					</strong></p>
				</div> -->
			</div>
		</div>
	</div>
</body>
</html>