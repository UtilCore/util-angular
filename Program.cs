using Util;
using Util.Logging.Serilog;
using Util.Ui.NgZorro;

//����WebӦ�ó���������
var builder = WebApplication.CreateBuilder( args );

//����Util����
builder.Host.AddUtil( options => options
    .UseNgZorro()
    .UseSerilog()
);

//����WebӦ�ó���
var app = builder.Build();

//��������ܵ�
app.UseNgZorro( "http://localhost:18888" );

//����Ӧ��
app.Run();