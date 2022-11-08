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
			background-color: rgb(103, 191, 203)
		}
	</style>
</head>
<body>
	<div width="100%" style="background: #222;border-radius: 12px;padding:15px;">
		<div class="col-md-12" >
			<p style="text-align: center;color: #fff">Đây là email tự động. Quý khách vui lòng không trả lời email này.</p>
			<div class="row" style="background: rgb(96, 152, 198);padding: 15px">

				<div class="col-md-6" style="text-align: center;color: red;font-weight: bold;font-size: 30px">
					<h4 style="margin:0">NEW USER APPLY TO JOB</h4>
				</div>
				{{-- <div class="col-md-6"  style="color: rgb(44, 5, 5)"> --}}
					<strong style="color: rgb(44, 5, 5);font-size:18px">CONTACT INFORMATION</strong>
				{{-- </div> --}}
				<div class="col-md-12">
					<p>Name:
						@if($info['name']=='')
							<strong style="color:rgb(22, 21, 21)">không có</strong>
						@else
							<strong style="color:rgb(19, 18, 18)">{{$info['name']}}</strong>
						@endif
					</strong></p>
					<p>Phone:
						@if($info['phone']=='')
							<strong style="color:rgb(24, 22, 22)">không có</strong>
						@else
							<strong style="color:rgb(16, 16, 16)">{{$info['phone']}}</strong>
						@endif
					</strong></p>
					<p>Email:
						@if($info['email']=='')
							<strong style="color:rgb(19, 19, 19)">không có</strong>
						@else
							<strong style="color:rgb(10, 10, 10)">{{$info['email']}}</strong>
						@endif
					</strong></p>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
